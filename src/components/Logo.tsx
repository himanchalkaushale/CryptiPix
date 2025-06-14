import React from 'react';
import { Image, Lock, Zap } from 'lucide-react';

export const CryptiPixLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main container with gradient background */}
      <div className="relative p-2 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-xl shadow-lg overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
        
        {/* Main image icon */}
        <div className="relative z-10">
          <Image className="w-full h-full text-white" strokeWidth={2.5} />
        </div>
        
        {/* Lock overlay - positioned in bottom right */}
        <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full p-1 shadow-md">
          <Lock className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
        
        {/* Pixel effect dots */}
        <div className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full"></div>
        <div className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full"></div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
      </div>
    </div>
  );
};

export const CryptiPixWordmark: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <CryptiPixLogo className="w-10 h-10" />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 bg-clip-text text-transparent leading-tight">
          CryptiPix
        </h1>
        <p className="text-xs text-gray-600 -mt-1">Hide messages in images</p>
      </div>
    </div>
  );
};