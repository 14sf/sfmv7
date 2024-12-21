import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, Clock, Download, MapPin } from 'lucide-react';
import { Message } from '../../types';
import { formatTime } from '../../utils/format';

interface MessageItemProps {
  message: Message;
  showAvatar: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, showAvatar }) => {
  const isOutgoing = message.senderId === 'current-user';

  const renderStatus = () => {
    switch (message.status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const renderContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <img
            src={message.content}
            alt="Message attachment"
            className="max-w-sm rounded-lg cursor-pointer hover:opacity-90"
          />
        );
      case 'document':
        return (
          <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Download className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {message.metadata?.fileName}
            </span>
            <span className="text-xs text-gray-500">
              {message.metadata?.fileSize}
            </span>
          </div>
        );
      case 'location':
        return (
          <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {message.metadata?.location?.address}
            </span>
          </div>
        );
      default:
        return (
          <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
            {message.content}
          </p>
        );
    }
  };

  return (
    <div
      className={`flex items-end gap-2 ${
        isOutgoing ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {showAvatar && !isOutgoing && (
        <img
          src={`https://ui-avatars.com/api/?name=${message.senderId}`}
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
      )}

      <div
        className={`max-w-[70%] ${
          isOutgoing
            ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-r-lg rounded-tl-lg'
        } p-3`}
      >
        {renderContent()}

        <div className={`flex items-center gap-1 mt-1 ${
          isOutgoing ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-xs opacity-70">
            {formatTime(message.timestamp)}
          </span>
          {isOutgoing && renderStatus()}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;