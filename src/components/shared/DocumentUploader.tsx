import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, Video, FileText, File } from 'lucide-react';
import { DocumentType, DOCUMENT_CONFIG } from '../../types/documents';
import { useToast } from '../../hooks/useToast';

interface DocumentUploaderProps {
  onUpload: (file: File, type: DocumentType) => void;
  allowedTypes?: DocumentType[];
  maxSize?: number;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onUpload,
  allowedTypes = ['image', 'video', 'invoice', 'contract', 'receipt'],
  maxSize = DOCUMENT_CONFIG.maxSize
}) => {
  const [dragActive, setDragActive] = useState(false);
  const { showToast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.size > maxSize) {
      showToast(`File size must be less than ${maxSize / (1024 * 1024)}MB`, 'error');
      return;
    }

    let type: DocumentType = 'other';
    if (DOCUMENT_CONFIG.allowedTypes.image.includes(file.type)) {
      type = 'image';
    } else if (DOCUMENT_CONFIG.allowedTypes.video.includes(file.type)) {
      type = 'video';
    } else if (DOCUMENT_CONFIG.allowedTypes.document.includes(file.type)) {
      type = file.name.toLowerCase().includes('invoice') ? 'invoice' : 'contract';
    }

    if (!allowedTypes.includes(type)) {
      showToast('Unsupported file type', 'error');
      return;
    }

    onUpload(file, type);
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <input
          type="file"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept={[
            ...DOCUMENT_CONFIG.allowedTypes.image,
            ...DOCUMENT_CONFIG.allowedTypes.video,
            ...DOCUMENT_CONFIG.allowedTypes.document
          ].join(',')}
        />
        
        <div className="text-center">
          <Upload className="w-10 h-10 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Drag and drop files here or click to browse
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Supported formats: Images, Videos, PDFs, and Documents up to {maxSize / (1024 * 1024)}MB
          </p>
        </div>
      </div>

      {/* Quick Upload Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { type: 'image', icon: Image, label: 'Upload Images' },
          { type: 'video', icon: Video, label: 'Upload Video' },
          { type: 'invoice', icon: FileText, label: 'Add Invoice' },
          { type: 'contract', icon: File, label: 'Add Contract' }
        ].map(({ type, icon: Icon, label }) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.querySelector('input[type="file"]')?.click()}
            className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
          >
            <Icon className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default DocumentUploader;