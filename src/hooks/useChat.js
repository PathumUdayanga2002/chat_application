// useChat.js
import { useState, useEffect } from 'react';
import { addDocument, listenToCollection } from '../firebase/firestore';

export const useChat = (collectionName) => {
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [loading, setLoading] = useState(true); // State to track loading status

  // Function to send a new message
  const sendMessage = async (message, sender) => {
    try {
      await addDocument(collectionName, {
        text: message,
        sender: sender,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Effect to listen for real-time updates to the chat messages
  useEffect(() => {
    const unsubscribe = listenToCollection(collectionName, (data) => {
      setMessages(data); // Update messages state with new data
      setLoading(false); // Set loading to false once data is fetched
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [collectionName]);

  return { messages, sendMessage, loading };
};