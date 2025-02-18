// auth.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail as updateUserEmail, updatePassword as updateUserPassword } from 'firebase/auth';
import firebaseConfig from './firebaseconfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup function
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login function
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout function
export const logout = () => {
  return signOut(auth);
};

// Reset password function
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Update email function
export const updateEmail = (user, email) => {
  return updateUserEmail(user, email);
};

// Update password function
export const updatePassword = (user, password) => {
  return updateUserPassword(user, password);
};

export { auth };