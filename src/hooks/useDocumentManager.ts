import { useState } from 'react';
import { Document, DocumentType, DOCUMENT_CONFIG } from '../types/documents';
import { useToast } from './useToast';

export const useDocumentManager = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { showToast } = useToast();

  const validateFile = (file: File): { isValid: boolean; type: DocumentType } => {
    // Check file size
    if (file.size > DOCUMENT_CONFIG.maxSize) {
      showToast(`File size must be less than ${DOCUMENT_CONFIG.maxSize / (1024 * 1024)}MB`, 'error');
      return { isValid: false, type: 'other' };
    }

    // Determine file type
    let documentType: DocumentType = 'other';
    if (DOCUMENT_CONFIG.allowedTypes.image.includes(file.type)) {
      documentType = 'image';
    } else if (DOCUMENT_CONFIG.allowedTypes.video.includes(file.type)) {
      documentType = 'video';
    } else if (DOCUMENT_CONFIG.allowedTypes.document.includes(file.type)) {
      documentType = file.name.toLowerCase().includes('invoice') ? 'invoice' : 'contract';
    } else {
      showToast('Unsupported file type', 'error');
      return { isValid: false, type: 'other' };
    }

    return { isValid: true, type: documentType };
  };

  const uploadDocument = async (
    file: File,
    type: DocumentType,
    metadata?: Document['metadata'],
    propertyId?: string,
    productId?: string
  ) => {
    try {
      setIsUploading(true);
      const { isValid, type: detectedType } = validateFile(file);
      if (!isValid) return null;

      // In a real app, this would upload to a server
      const document: Document = {
        id: Date.now().toString(),
        type: type || detectedType,
        name: file.name,
        url: URL.createObjectURL(file), // Temporary URL for demo
        size: file.size,
        mimeType: file.type,
        uploadedAt: Date.now(),
        uploadedBy: 'current-user',
        propertyId,
        productId,
        metadata
      };

      setDocuments(prev => [...prev, document]);
      showToast('Document uploaded successfully!', 'success');
      return document;
    } catch (error) {
      showToast('Failed to upload document', 'error');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      showToast('Document deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed to delete document', 'error');
    }
  };

  const downloadDocument = async (document: Document) => {
    try {
      // In a real app, this would download from the server
      window.open(document.url, '_blank');
      showToast('Document download started', 'success');
    } catch (error) {
      showToast('Failed to download document', 'error');
    }
  };

  return {
    documents,
    isUploading,
    uploadDocument,
    deleteDocument,
    downloadDocument
  };
};