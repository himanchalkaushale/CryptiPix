export interface StegImage {
  file: File;
  dataUrl: string;
  canvas?: HTMLCanvasElement;
  imageData?: ImageData;
}

export interface ExtractResult {
  message: string;
  isEncrypted: boolean;
  success: boolean;
}

export interface EmbedOptions {
  message: string;
  encrypt: boolean;
  password?: string;
}

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  message: string;
}
