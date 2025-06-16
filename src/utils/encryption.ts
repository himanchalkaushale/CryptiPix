// AES encryption utilities using Web Crypto API
export class EncryptionUtil {
  private static async getKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );
    
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }

  static async encrypt(text: string, password: string): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      
      const key = await this.getKey(password, salt);
      
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        data
      );
      
      // Combine salt, iv, and encrypted data
      const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      combined.set(salt);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);
      
      return Array.from(combined).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      throw new Error('Encryption failed: ' + (error as Error).message);
    }
  }

  static async decrypt(encryptedHex: string, password: string): Promise<string> {
    try {
      const encrypted = new Uint8Array(
        encryptedHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
      );
      
      const salt = encrypted.slice(0, 16);
      const iv = encrypted.slice(16, 28);
      const data = encrypted.slice(28);
      
      const key = await this.getKey(password, salt);
      
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        data
      );
      
      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    } catch (error) {
      throw new Error('Decryption failed: Invalid password or corrupted data');
    }
  }
}
