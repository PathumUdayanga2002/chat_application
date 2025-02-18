// AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail as updateUserEmail, updatePassword as updateUserPassword, onAuthStateChanged } from 'firebase/auth';

 // Import the default export from firebaseconfig.js

import firebaseConfig from '../firebase/firebaseconfig';
//initializeApp(firebaseConfig);
import { initializeApp } from 'firebase/app';
const app = initializeApp(firebaseConfig);
// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your application
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app); // Use the initialized app here

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, [auth]);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };

    // Reset password function
    const resetPassword = (email) => {
      return sendPasswordResetEmail(auth, email);
    };

      // Update email function
  const updateEmail = (email) => {
    return updateUserEmail(currentUser, email);
  };

    // Update password function
    const updatePassword = (password) => {
      return updateUserPassword(currentUser, password);
    };

    
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export  { AuthContext };

// // AuthContext.jsx




// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { auth } from '../firebase/auth'; // Import Firebase auth instance

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// // AuthProvider component to wrap your application
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null); // Track the authenticated user
//   const [loading, setLoading] = useState(true); // Track loading state

//   // Signup function
//   const signup = (email, password) => {
//     return auth.createUserWithEmailAndPassword(email, password);
//   };

//   // Login function
//   const login = (email, password) => {
//     return auth.signInWithEmailAndPassword(email, password);
//   };

//   // Logout function
//   const logout = () => {
//     return auth.signOut();
//   };

//   // Reset password function
//   const resetPassword = (email) => {
//     return auth.sendPasswordResetEmail(email);
//   };

//   // Update email function
//   const updateEmail = (email) => {
//     return currentUser.updateEmail(email);
//   };

//   // Update password function
//   const updatePassword = (password) => {
//     return currentUser.updatePassword(password);
//   };

//   // Effect to listen for authentication state changes
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user); // Set the current user
//       setLoading(false); // Set loading to false once the user is fetched
//     });

//     return unsubscribe; // Cleanup subscription on unmount
//   }, []);

//   // Value to be provided by the context
//   const value = {
//     currentUser,
//     signup,
//     login,
//     logout,
//     resetPassword,
//     updateEmail,
//     updatePassword,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children} {/* Render children only when not loading */}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext

// // Export AuthContext as a named export
// export { AuthContext };