import React from 'react';
import { formatDate } from '../utils/helper';

const Message = ({ message }) => {
  const isSentByCurrentUser = message.sender === 'currentUser'; // Replace with actual logic

  return (
    <div className={`flex ${isSentByCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isSentByCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-xs text-gray-400 block mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
          <small>{formatDate(message.timestamp?.toDate())}</small>
        </span>
      </div>
    </div>
  );
};

export default Message;