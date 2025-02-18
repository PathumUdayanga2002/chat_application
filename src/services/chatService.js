// chatService.js
import { addDocument, listenToCollection, queryDocuments } from '../firebase/firestore';

// Send a new message
export const sendMessage = async (collectionName, message, sender) => {
  try {
    await addDocument(collectionName, {
      text: message,
      sender: sender,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Fetch messages from a collection
export const fetchMessages = async (collectionName) => {
  try {
    const messages = await queryDocuments(collectionName, 'timestamp', '>=', new Date(0)); // Fetch all messages
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Listen for real-time updates to a collection
export const listenToMessages = (collectionName, callback) => {
  try {
    const unsubscribe = listenToCollection(collectionName, (messages) => {
      callback(messages);
    });
    return unsubscribe; // Return the unsubscribe function to clean up the listener
  } catch (error) {
    console.error('Error listening to messages:', error);
    throw error;
  }
};