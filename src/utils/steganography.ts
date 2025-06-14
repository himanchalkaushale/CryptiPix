import { EncryptionUtil } from './encryption';
import { EmbedOptions, ExtractResult } from '../types';

export class SteganographyUtil {
  private static readonly DELIMITER = '1111111111111110'; // Binary delimiter
  private static readonly ENCRYPTED_PREFIX = 'ENC:';

  static stringToBinary(str: string): string {
    return str
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('');
  }

  static binaryToString(binary: string): string {
    const chars = binary.match(/.{1,8}/g) || [];
    return chars
      .map(char => String.fromCharCode(parseInt(char, 2)))
      .join('');
  }

  static async embedMessage(
    canvas: HTMLCanvasElement,
    options: EmbedOptions,
    onProgress?: (progress: number) => void
  ): Promise<void> {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get canvas context');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let { message } = options;

    // Encrypt if requested
    if (options.encrypt && options.password) {
      message = this.ENCRYPTED_PREFIX + await EncryptionUtil.encrypt(message, options.password);
    }

    const binaryMessage = this.stringToBinary(message) + this.DELIMITER;
    const totalPixels = Math.ceil(binaryMessage.length / 3);

    if (totalPixels * 4 > data.length) {
      throw new Error('Message too large for this image. Try a larger image or shorter message.');
    }

    // Embed binary message into LSBs
    for (let i = 0; i < binaryMessage.length; i++) {
      const pixelIndex = Math.floor(i / 3) * 4;
      const channelIndex = i % 3; // R, G, or B channel
      
      const bit = parseInt(binaryMessage[i]);
      const currentValue = data[pixelIndex + channelIndex];
      
      // Set LSB
      data[pixelIndex + channelIndex] = (currentValue & 0xFE) | bit;

      if (onProgress && i % 1000 === 0) {
        onProgress((i / binaryMessage.length) * 100);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    onProgress?.(100);
  }

  static async extractMessage(
    canvas: HTMLCanvasElement,
    password?: string,
    onProgress?: (progress: number) => void
  ): Promise<ExtractResult> {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get canvas context');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let binaryMessage = '';
    let foundDelimiter = false;

    // Extract binary data from LSBs
    for (let i = 0; i < data.length && !foundDelimiter; i += 4) {
      for (let j = 0; j < 3; j++) { // R, G, B channels
        if (i + j < data.length) {
          const bit = data[i + j] & 1;
          binaryMessage += bit;

          // Check for delimiter
          if (binaryMessage.endsWith(this.DELIMITER)) {
            foundDelimiter = true;
            binaryMessage = binaryMessage.slice(0, -this.DELIMITER.length);
            break;
          }

          if (onProgress && binaryMessage.length % 1000 === 0) {
            onProgress((binaryMessage.length / (data.length * 3)) * 100);
          }
        }
      }
    }

    if (!foundDelimiter) {
      return {
        message: '',
        isEncrypted: false,
        success: false
      };
    }

    let message = this.binaryToString(binaryMessage);
    let isEncrypted = false;

    // Check if message is encrypted
    if (message.startsWith(this.ENCRYPTED_PREFIX)) {
      isEncrypted = true;
      const encryptedMessage = message.slice(this.ENCRYPTED_PREFIX.length);
      
      if (password) {
        try {
          message = await EncryptionUtil.decrypt(encryptedMessage, password);
        } catch (error) {
          throw new Error('Failed to decrypt message: ' + (error as Error).message);
        }
      } else {
        throw new Error('This message is encrypted. Please provide the password.');
      }
    }

    onProgress?.(100);

    return {
      message,
      isEncrypted,
      success: true
    };
  }

  static validateImageForSteganography(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp'];
      if (!validTypes.includes(file.type)) {
        resolve(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        // Check minimum size requirements
        resolve(img.width >= 50 && img.height >= 50);
      };
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
  }

  static calculateMaxMessageLength(width: number, height: number): number {
    const totalPixels = width * height;
    const totalBits = totalPixels * 3; // RGB channels
    const delimiterBits = this.DELIMITER.length;
    const maxBits = totalBits - delimiterBits - 100; // Safety margin
    return Math.floor(maxBits / 8); // Convert to characters
  }
}