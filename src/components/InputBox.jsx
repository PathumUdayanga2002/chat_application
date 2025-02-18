import React from 'react';

const InputBox = ({ newMessage, setNewMessage, onSendMessage, disabled }) => {
  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          disabled={disabled}
        />
        <button
          onClick={onSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          disabled={disabled}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default InputBox;







