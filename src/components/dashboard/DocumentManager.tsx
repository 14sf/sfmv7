import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Trash2, Download } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

const DocumentManager = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const { showToast } = useToast();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date()
      };
      setDocuments([...documents, newDoc]);
      showToast('Document uploaded successfully!', 'success');
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    showToast('Document deleted successfully!', 'success');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      {/* Upload Section */}
      <div className="mb-6">
        <label className="relative flex items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500">
          <input
            type="file"
            onChange={handleUpload}
            className="hidden"
          />
          <div className="text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click to upload documents
            </p>
          </div>
        </label>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {documents.map(doc => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {doc.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatFileSize(doc.size)} • {doc.uploadedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400"
              >
                <Download className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDelete(doc.id)}
                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}

        {documents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No documents uploaded yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentManager;