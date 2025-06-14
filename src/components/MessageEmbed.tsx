import React, { useState, useRef, useEffect } from 'react';
import { Lock, Download, Eye, EyeOff, Loader2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { StegImage, EmbedOptions, ProcessingState } from '../types';
import { SteganographyUtil } from '../utils/steganography';

export const MessageEmbed: React.FC = () => {
  const [image, setImage] = useState<StegImage | null>(null);
  const [message, setMessage] = useState('');
  const [useEncryption, setUseEncryption] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    message: ''
  });
  const [maxMessageLength, setMaxMessageLength] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const max = SteganographyUtil.calculateMaxMessageLength(img.width, img.height);
        setMaxMessageLength(max);
      };
      
      img.src = image.dataUrl;
    }
  }, [image]);

  const handleEmbed = async () => {
    if (!image || !canvasRef.current || !message.trim()) return;

    if (useEncryption && !password.trim()) {
      alert('Please enter a password for encryption');
      return;
    }

    if (message.length > maxMessageLength) {
      alert(`Message too long. Maximum ${maxMessageLength} characters allowed for this image.`);
      return;
    }

    setProcessing({
      isProcessing: true,
      progress: 0,
      message: 'Embedding message...'
    });

    try {
      const options: EmbedOptions = {
        message: message.trim(),
        encrypt: useEncryption,
        password: useEncryption ? password : undefined
      };

      await SteganographyUtil.embedMessage(
        canvasRef.current,
        options,
        (progress) => setProcessing(prev => ({ ...prev, progress }))
      );

      setProcessing({
        isProcessing: false,
        progress: 100,
        message: 'Message embedded successfully!'
      });

      setTimeout(() => {
        setProcessing(prev => ({ ...prev, message: '' }));
      }, 3000);

    } catch (error) {
      setProcessing({
        isProcessing: false,
        progress: 0,
        message: ''
      });
      alert((error as Error).message);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `steganographic_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  return (
    <div className="space-y-8">
      <ImageUpload
        image={image}
        onImageUpload={setImage}
        onImageRemove={() => setImage(null)}
        title="Upload Image for Embedding"
        description="Choose an image where you want to hide your secret message"
      />

      {image && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Secret Message</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                rows={4}
                placeholder="Enter your secret message here..."
                maxLength={maxMessageLength}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Characters: {message.length}/{maxMessageLength}</span>
                <span className={message.length > maxMessageLength ? 'text-red-500' : ''}>
                  {message.length > maxMessageLength ? 'Message too long!' : 'Within limit'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="useEncryption"
                checked={useEncryption}
                onChange={(e) => setUseEncryption(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="useEncryption" className="flex items-center text-sm font-medium text-gray-700">
                <Lock className="w-4 h-4 mr-1" />
                Encrypt message with password
              </label>
            </div>

            {useEncryption && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Encryption Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    placeholder="Enter encryption password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {processing.isProcessing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  <span className="text-sm text-blue-800">{processing.message}</span>
                </div>
                <div className="mt-2 bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${processing.progress}%` }}
                  />
                </div>
              </div>
            )}

            {processing.message && !processing.isProcessing && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">{processing.message}</p>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleEmbed}
                disabled={!message.trim() || processing.isProcessing || message.length > maxMessageLength}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-lg hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {processing.isProcessing ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Embedding...
                  </div>
                ) : (
                  'Embed Message'
                )}
              </button>

              <button
                onClick={handleDownload}
                disabled={processing.progress !== 100 || processing.isProcessing}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-lg hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
};