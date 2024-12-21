import React from 'react';
import { FileText, Image, Receipt } from 'lucide-react';
import { DocumentType } from '../../types/book';

interface DocumentUploadProps {
  isDisabled: boolean;
  onUpload: (type: DocumentType, file: File) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ isDisabled, onUpload }) => {
  const handleFileChange = (type: DocumentType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(type, file);
    }
  };

  const uploadButtons = [
    { type: 'document' as DocumentType, icon: FileText, label: 'Document' },
    { type: 'image' as DocumentType, icon: Image, label: 'Image' },
    { type: 'receipt' as DocumentType, icon: Receipt, label: 'Receipt' }
  ];

  return (
    <div className="flex gap-2">
      {uploadButtons.map(({ type, icon: Icon, label }) => (
        <div key={type} className="flex-1 relative">
          <input
            type="file"
            onChange={handleFileChange(type)}
            disabled={isDisabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            accept={type === 'image' ? 'image/*' : type === 'document' ? '.pdf,.doc,.docx' : '*'}
          />
          <button
            disabled={isDisabled}
            className="w-full p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col items-center">
              <Icon className="w-5 h-5 text-gray-400 mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default DocumentUpload;