import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Document } from '../../../types/real-estate/documents';
import DocumentUploader from './DocumentUploader';
import DocumentList from './DocumentList';
import { useToast } from '../../../hooks/useToast';

interface DocumentManagerProps {
  propertyId: string;
  initialDocuments?: Document[];
}

const DocumentManager: React.FC<DocumentManagerProps> = ({
  propertyId,
  initialDocuments = []
}) => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const { showToast } = useToast();

  const handleUpload = async (doc: Omit<Document, 'id' | 'url'>) => {
    try {
      // In a real app, this would upload to a server and get a URL back
      const newDoc: Document = {
        ...doc,
        id: Date.now().toString(),
        url: URL.createObjectURL(new File([], doc.name)) // Temporary URL for demo
      };

      setDocuments([...documents, newDoc]);
      showToast('Document uploaded successfully!', 'success');
    } catch (error) {
      showToast('Failed to upload document', 'error');
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      setDocuments(documents.filter(doc => doc.id !== documentId));
      showToast('Document deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed to delete document', 'error');
    }
  };

  const handleDownload = async (document: Document) => {
    try {
      // In a real app, this would download from the server
      window.open(document.url, '_blank');
      showToast('Document download started', 'success');
    } catch (error) {
      showToast('Failed to download document', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Property Documents
        </h3>
      </div>

      <DocumentUploader
        propertyId={propertyId}
        onUpload={handleUpload}
      />

      <DocumentList
        documents={documents}
        onDelete={handleDelete}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default DocumentManager;