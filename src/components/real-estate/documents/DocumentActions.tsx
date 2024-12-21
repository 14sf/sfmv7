import React from 'react';
import { motion } from 'framer-motion';
import { Image, FileText, Video, File } from 'lucide-react';
import { DocumentType } from '../../../types/real-estate/documents';

interface DocumentActionsProps {
  onUpload: (type: DocumentType) => void;
}

const DocumentActions: React.FC<DocumentActionsProps> = ({ onUpload }) => {
  const documentTypes = [
    { type: 'image', icon: Image, label: 'Upload Images', color: 'blue' },
    { type: 'video', icon: Video, label: 'Upload Video', color: 'purple' },
    { type: 'invoice', icon: FileText, label: 'Add Invoice', color: 'green' },
    { type: 'contract', icon: File, label: 'Add Contract', color: 'orange' }
  ] as const;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {documentTypes.map(({ type, icon: Icon, label, color }) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onUpload(type)}
          className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 hover:bg-${color}-100 dark:hover:bg-${color}-900/30`}
        >
          <Icon className="w-6 h-6" />
          <span className="text-sm font-medium text-center">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default DocumentActions;