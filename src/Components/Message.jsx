import React from 'react';

const Message = ({ text, sender, currentUser }) => {
  const isMine = sender === currentUser;

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isMine
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-800 border'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;