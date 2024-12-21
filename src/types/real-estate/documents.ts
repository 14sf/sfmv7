export type DocumentType = 'image' | 'video' | 'invoice' | 'contract' | 'other';

export interface Document {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: number;
  uploadedBy: string;
  propertyId: string;
  metadata?: {
    description?: string;
    category?: string;
    expiryDate?: string;
    contractType?: 'lease' | 'sale' | 'maintenance';
  };
}

export interface DocumentUploadConfig {
  maxSize: number;
  allowedTypes: {
    image: string[];
    video: string[];
    document: string[];
  };
}

export const DOCUMENT_CONFIG: DocumentUploadConfig = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    video: ['video/mp4', 'video/webm'],
    document: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  }
};