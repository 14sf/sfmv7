import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Video, File, Download, Trash2, Calendar } from 'lucide-react';
import { Document } from '../../../types/real-estate/documents';

interface DocumentListProps {
  documents: Document[];
  onDelete: (documentId: string) => void;
  onDownload: (document: Document) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDelete,
  onDownload
}) => {
  const getIcon = (type: Document['type']) => {
    switch (type) {
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'invoice':
        return FileText;
      case 'contract':
        return File;
      default:
        return FileText;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-4">
      {documents.map((doc) => {
        const Icon = getIcon(doc.type);
        
        return (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {doc.name}
                </h4>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatFileSize(doc.size)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
                {doc.metadata?.expiryDate && (
                  <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                    Expires: {new Date(doc.metadata.expiryDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDownload(doc)}
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400"
              >
                <Download className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(doc.id)}
                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        );
      })}

      {documents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No documents uploaded yet
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentList;