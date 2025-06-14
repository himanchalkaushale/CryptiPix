import React from 'react';
import { Info, Shield, Image, Lock, AlertTriangle, BookOpen } from 'lucide-react';
import { CryptiPixLogo } from './Logo';

export const Help: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-8 border border-indigo-200">
        <div className="flex items-center mb-4">
          <CryptiPixLogo className="w-12 h-12 mr-4" />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 bg-clip-text text-transparent">
              CryptiPix
            </h2>
            <p className="text-indigo-800 leading-relaxed mt-2">
              Advanced image steganography tool that uses LSB (Least Significant Bit) technique to hide secret messages 
              within images. Messages are invisible to the naked eye and can optionally be encrypted for additional security.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <Image className="w-6 h-6 text-emerald-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">How LSB Steganography Works</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Embedding:</strong> Your secret message is converted to binary and embedded 
              into the least significant bits of the image pixels' RGB channels.
            </p>
            <p>
              <strong>Extraction:</strong> The hidden binary data is extracted from the LSBs and 
              converted back to readable text.
            </p>
            <p>
              <strong>Invisibility:</strong> Changes to LSBs cause minimal visual difference, 
              making the hidden message virtually undetectable.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <Lock className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">AES Encryption</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Algorithm:</strong> Uses AES-256-GCM encryption with PBKDF2 key derivation 
              for maximum security.
            </p>
            <p>
              <strong>Security:</strong> 100,000 iterations with random salt and IV ensure 
              resistance against brute-force attacks.
            </p>
            <p>
              <strong>Integrity:</strong> GCM mode provides both encryption and authentication 
              to detect tampering.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <Info className="w-6 h-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">How to Use CryptiPix</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-emerald-700 mb-3">Embedding Messages</h4>
            <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Go to the "Embed Message" tab</li>
              <li>Upload an image (PNG, JPEG, JPG, or BMP)</li>
              <li>Type your secret message in the text area</li>
              <li>Optionally enable encryption and set a password</li>
              <li>Click "Embed Message" to hide your text</li>
              <li>Download the modified image</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-700 mb-3">Extracting Messages</h4>
            <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
              <li>Go to the "Extract Message" tab</li>
              <li>Upload an image with a hidden message</li>
              <li>If encrypted, enter the correct password</li>
              <li>Click "Extract Message" to reveal the hidden text</li>
              <li>Copy the extracted message if needed</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <Shield className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Security Features</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h5 className="font-semibold text-green-800 mb-2">Client-Side Processing</h5>
            <p className="text-sm text-green-700">
              All operations happen in your browser. Your images and messages never leave your device.
            </p>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h5 className="font-semibold text-indigo-800 mb-2">Strong Encryption</h5>
            <p className="text-sm text-indigo-700">
              AES-256 encryption with secure key derivation provides military-grade protection.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h5 className="font-semibold text-purple-800 mb-2">Tamper Detection</h5>
            <p className="text-sm text-purple-700">
              Authenticated encryption detects if the hidden message has been modified.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
        <div className="flex items-start mb-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 mr-2 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Notes</h3>
            <div className="space-y-2 text-sm text-amber-700">
              <p>• <strong>Image Format:</strong> Always save steganographic images as PNG to preserve quality</p>
              <p>• <strong>File Size:</strong> Larger images can hide longer messages</p>
              <p>• <strong>Password Security:</strong> Use strong, unique passwords for encrypted messages</p>
              <p>• <strong>Backup:</strong> Keep backup copies of passwords - lost passwords mean lost messages</p>
              <p>• <strong>Compression:</strong> Avoid JPEG compression as it may damage hidden data</p>
              <p>• <strong>Legal Use:</strong> Use responsibly and comply with applicable laws</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Specifications</h3>
        
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Supported Formats</h4>
            <ul className="space-y-1">
              <li>• Input: PNG, JPEG, JPG, BMP</li>
              <li>• Output: PNG (recommended)</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Minimum dimensions: 50×50 pixels</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Encryption Details</h4>
            <ul className="space-y-1">
              <li>• Algorithm: AES-256-GCM</li>
              <li>• Key derivation: PBKDF2</li>
              <li>• Iterations: 100,000</li>
              <li>• Salt: 128-bit random</li>
              <li>• IV: 96-bit random</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};