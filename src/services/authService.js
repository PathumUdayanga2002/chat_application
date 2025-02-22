// src/services/authService.js
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

/**
 * Register a new user with email and password.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user: ", error);
    throw error;
  }
};

/**
 * Log in a user with email and password.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
};

/**
 * Log out the current user.
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out: ", error);
    throw error;
  }
};
//add deployement comments