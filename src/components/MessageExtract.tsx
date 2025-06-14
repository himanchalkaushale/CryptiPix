import React, { useState, useRef, useEffect } from 'react';
import { Key, Eye, EyeOff, Loader2, Copy, CheckCircle } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { StegImage, ExtractResult, ProcessingState } from '../types';
import { SteganographyUtil } from '../utils/steganography';

export const MessageExtract: React.FC = () => {
  const [image, setImage] = useState<StegImage | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [extractResult, setExtractResult] = useState<ExtractResult | null>(null);
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    message: ''
  });
  const [copied, setCopied] = useState(false);
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
      };
      
      img.src = image.dataUrl;
    }
  }, [image]);

  const handleExtract = async () => {
    if (!image || !canvasRef.current) return;

    setProcessing({
      isProcessing: true,
      progress: 0,
      message: 'Extracting message...'
    });

    try {
      const result = await SteganographyUtil.extractMessage(
        canvasRef.current,
        password.trim() || undefined,
        (progress) => setProcessing(prev => ({ ...prev, progress }))
      );

      setExtractResult(result);
      
      if (result.success) {
        setProcessing({
          isProcessing: false,
          progress: 100,
          message: 'Message extracted successfully!'
        });
      } else {
        setProcessing({
          isProcessing: false,
          progress: 0,
          message: 'No hidden message found in this image.'
        });
      }

      setTimeout(() => {
        setProcessing(prev => ({ ...prev, message: '' }));
      }, 3000);

    } catch (error) {
      setProcessing({
        isProcessing: false,
        progress: 0,
        message: ''
      });
      setExtractResult(null);
      alert((error as Error).message);
    }
  };

  const handleCopy = async () => {
    if (extractResult?.message) {
      try {
        await navigator.clipboard.writeText(extractResult.message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = extractResult.message;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="space-y-8">
      <ImageUpload
        image={image}
        onImageUpload={setImage}
        onImageRemove={() => {
          setImage(null);
          setExtractResult(null);
        }}
        title="Upload Image for Extraction"
        description="Choose an image that may contain a hidden message"
      />

      {image && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Extract Hidden Message</h3>
          
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Key className="w-4 h-4 inline mr-1" />
                Decryption Password (if message is encrypted)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  placeholder="Enter password (leave empty if not encrypted)"
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
              <div className={`border rounded-lg p-4 ${
                extractResult?.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <p className={`text-sm ${
                  extractResult?.success 
                    ? 'text-green-800' 
                    : 'text-amber-800'
                }`}>
                  {processing.message}
                </p>
              </div>
            )}

            <button
              onClick={handleExtract}
              disabled={processing.isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {processing.isProcessing ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Extracting...
                </div>
              ) : (
                'Extract Message'
              )}
            </button>

            {extractResult?.success && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-green-800">Hidden Message Found!</h4>
                  <div className="flex items-center space-x-2">
                    {extractResult.isEncrypted && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <Key className="w-3 h-3 mr-1" />
                        Encrypted
                      </span>
                    )}
                    <button
                      onClick={handleCopy}
                      className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                      title="Copy message"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-white border border-green-200 rounded-lg p-4 min-h-[100px] max-h-[300px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                    {extractResult.message}
                  </pre>
                </div>
                {copied && (
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Message copied to clipboard!
                  </p>
                )}
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
};