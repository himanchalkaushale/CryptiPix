import React from 'react';
import { Image, Lock } from 'lucide-react';

export const CryptiPixLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
        <Image className="w-full h-full text-white" />
        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 shadow-md">
          <Lock className="w-3 h-3 text-white" />
        </div>
      </div>
    </div>
  );
};

export const CryptiPixWordmark: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <CryptiPixLogo className="w-10 h-10" />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800">CryptiPix</h1>
        <p className="text-sm text-gray-600">Hide messages in images</p>
      </div>
    </div>
  );
};
