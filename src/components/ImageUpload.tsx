import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { StegImage } from '../types';

interface ImageUploadProps {
  image: StegImage | null;
  onImageUpload: (image: StegImage) => void;
  onImageRemove: () => void;
  title: string;
  description: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  onImageUpload,
  onImageRemove,
  title,
  description
}) => {
  const handleFileUpload = useCallback(async (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp'];
    
    if (!validTypes.includes(file.type)) {
      throw new Error('Please select a valid image file (PNG, JPEG, JPG, or BMP)');
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error('Image file too large. Please select an image under 10MB.');
    }

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });

    onImageUpload({ file, dataUrl });
  }, [onImageUpload]);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    if (files.length > 0) {
      try {
        await handleFileUpload(files[0]);
      } catch (error) {
        alert((error as Error).message);
      }
    }
  }, [handleFileUpload]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      try {
        await handleFileUpload(files[0]);
      } catch (error) {
        alert((error as Error).message);
      }
    }
  }, [handleFileUpload]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {!image ? (
        <div
          className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200 bg-gradient-to-br from-blue-50 to-indigo-50"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drop your image here or click to upload
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supports PNG, JPEG, JPG, and BMP files up to 10MB
              </p>
              <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 cursor-pointer font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <ImageIcon className="w-5 h-5 mr-2" />
                Choose Image
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/bmp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={image.dataUrl}
              alt="Uploaded"
              className="w-full h-64 object-cover"
            />
            <button
              onClick={onImageRemove}
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
            <p className="text-sm text-gray-600">
              <strong>File:</strong> {image.file.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Size:</strong> {(image.file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};