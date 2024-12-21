import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Image, Receipt } from 'lucide-react';
import { Book, DocumentType } from '../../../types/book';
import { useToast } from '../../../hooks/useToast';

interface DocumentUploadFormProps {
  book: Book;
  onClose: () => void;
}

const documentTypes = [
  { type: 'document' as DocumentType, icon: FileText, label: 'Document', description: 'Upload PDF or Word documents' },
  { type: 'image' as DocumentType, icon: Image, label: 'Image', description: 'Upload images or photos' },
  { type: 'receipt' as DocumentType, icon: Receipt, label: 'Receipt', description: 'Upload transaction receipts' }
];

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
  book,
  onClose
}) => {
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);
  const { showToast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedType) {
      try {
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Add document to book
        book.documents.push({
          type: selectedType,
          name: selectedFile.name,
          url: URL.createObjectURL(selectedFile)
        });

        showToast('Document uploaded successfully!', 'success');
        onClose();
      } catch (error) {
        showToast('Failed to upload document', 'error');
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upload Document
            </h3>
          </div>

          <div className="space-y-4">
            {/* Document Type Selection */}
            <div className="grid grid-cols-1 gap-3">
              {documentTypes.map(({ type, icon: Icon, label, description }) => (
                <motion.button
                  key={type}
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedType(type)}
                  className={`w-full flex items-start gap-3 p-4 rounded-lg border-2 transition-colors ${
                    selectedType === type
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 mt-0.5 ${
                    selectedType === type
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-400'
                  }`} />
                  <div className="text-left">
                    <p className={`font-medium ${
                      selectedType === type
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {label}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* File Upload */}
            {selectedType && (
              <div className="mt-6">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept={
                    selectedType === 'image' 
                      ? 'image/*' 
                      : selectedType === 'document'
                      ? '.pdf,.doc,.docx'
                      : '*'
                  }
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400"
                >
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to upload {selectedType}
                  </p>
                </label>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DocumentUploadForm;