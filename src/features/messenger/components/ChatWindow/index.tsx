import React, { useState, useRef, useEffect } from 'react';
import { Chat, Message } from '../../types';
import MessageList from './MessageList';
import ChatHeader from './ChatHeader';
import MessageComposer from './MessageComposer';
import { useToast } from '../../../../hooks/useToast';

interface ChatWindowProps {
  chat: Chat;
  onSendMessage: (content: string, type: Message['type']) => void;
  onUploadFile: (file: File) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  onSendMessage,
  onUploadFile
}) => {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      <ChatHeader chat={chat} />

      <MessageList messages={chat.messages || []} />

      <MessageComposer
        onSendMessage={(content) => onSendMessage(content, 'text')}
        onFileUpload={onUploadFile}
      />
    </div>
  );
};

export default ChatWindow;