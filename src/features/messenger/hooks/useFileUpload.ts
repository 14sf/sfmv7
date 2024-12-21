import { useCallback } from 'react';
import { useToast } from '../../../hooks/useToast';

const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB

export const useFileUpload = () => {
  const { showToast } = useToast();

  const validateFile = useCallback((file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      showToast('File size must be less than 16MB', 'error');
      return false;
    }

    const allowedTypes = ['image/', 'video/', 'application/pdf'];
    if (!allowedTypes.some(type => file.type.startsWith(type))) {
      showToast('Unsupported file type', 'error');
      return false;
    }

    return true;
  }, [showToast]);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!validateFile(file)) return null;

    try {
      // In a real app, this would upload to a server
      showToast('File uploaded successfully!', 'success');
      return URL.createObjectURL(file); // Temporary URL for demo
    } catch (error) {
      showToast('Failed to upload file', 'error');
      return null;
    }
  }, [validateFile, showToast]);

  return {
    handleFileUpload,
    validateFile
  };
};