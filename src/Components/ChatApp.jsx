import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, push, onChildAdded } from 'firebase/database';
import Message from './Message';
import SendMessage from './SendMessage';

const ChatApp = ({ username }) => {
  const [messages, setMessages] = useState([]);
useEffect(() => {
  const messageRef = ref(db, 'messages');

  const unsubscribe = onChildAdded(messageRef, (snapshot) => {
    const msg = snapshot.val();
    setMessages((prev) => {
      // جلوگیری از تکرار پیام
      if (prev.some((m) => m.timestamp === msg.timestamp)) return prev;
      return [...prev, msg];
    });
  });

  return () => {
    // پاک‌سازی لیسنر هنگام خروج
    unsubscribe();
  };
}, []);
  const handleSend = (text) => {
    const messageRef = ref(db, 'messages');
    push(messageRef, {
      text,
      sender: username,
      timestamp: Date.now()
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 text-lg font-bold">خوش آمدی، {username}</div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <Message key={index} {...msg} currentUser={username} />
        ))}
      </div>

      <SendMessage onSend={handleSend} />
    </div>
  );
};

export default ChatApp;