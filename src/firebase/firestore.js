// firestore.js
// Corrected import of app
import { getFirestore, collection, addDoc, query, where, getDocs, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import firebaseConfig from './firebaseconfig';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

// Initialize Firebase Firestore
const db = getFirestore(app);

// Add a new document to a collection
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

// Query documents in a collection
export const queryDocuments = async (collectionName, field, operator, value) => {
  try {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
};

// Listen for real-time updates to a collection
export const listenToCollection = (collectionName, callback) => {
  const q = collection(db, collectionName);
  return onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

// Update a document in a collection
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

// Delete a document from a collection
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export { db };



// // firestore.js
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc, query, where, getDocs, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
// import firebaseConfig from './firebaseconfig';

// import { app } from './firebaseconfig';

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Add a new document to a collection
// export const addDocument = async (collectionName, data) => {
//   try {
//     const docRef = await addDoc(collection(db, collectionName), data);
//     return docRef.id; // Return the ID of the newly created document
//   } catch (error) {
//     console.error('Error adding document:', error);
//     throw error;
//   }
// };

// // Query documents in a collection
// export const queryDocuments = async (collectionName, field, operator, value) => {
//   try {
//     const q = query(collection(db, collectionName), where(field, operator, value));
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error('Error querying documents:', error);
//     throw error;
//   }
// };

// // Listen for real-time updates to a collection
// export const listenToCollection = (collectionName, callback) => {
//   const q = collection(db, collectionName);
//   return onSnapshot(q, (querySnapshot) => {
//     const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     callback(data);
//   });
// };

// // Update a document in a collection
// export const updateDocument = async (collectionName, docId, data) => {
//   try {
//     const docRef = doc(db, collectionName, docId);
//     await updateDoc(docRef, data);
//   } catch (error) {
//     console.error('Error updating document:', error);
//     throw error;
//   }
// };

// // Delete a document from a collection
// export const deleteDocument = async (collectionName, docId) => {
//   try {
//     const docRef = doc(db, collectionName, docId);
//     await deleteDoc(docRef);
//   } catch (error) {
//     console.error('Error deleting document:', error);
//     throw error;
//   }
// };

// export { db };