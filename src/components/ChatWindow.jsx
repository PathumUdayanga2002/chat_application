import React from 'react';

const ChatWindow = ({ messages, currentUser }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex mb-4 ${
            message.senderId === currentUser.uid ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-xs p-3 rounded-lg ${
              message.senderId === currentUser.uid
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            <p className="text-sm">{message.text}</p>
            <span className="text-xs text-gray-400 block mt-1">
              {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;