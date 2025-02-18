import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../firebase/auth'; // Correct import path
import { useAuth } from '../hooks/useAuth';

import { db } from '../firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

const Signup = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Step 1: Create the user in Firebase Authentication
      const userCredential = await signup(email, password);
      const user = userCredential.user;

      // Step 2: Add user data to Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid, // Unique ID from Firebase Authentication
        email: user.email,
        createdAt: new Date(),
      });

      // Redirect to home page after successful signup
      navigate('/');
    } catch (error) {
      setError('Failed to sign up. Please try again.');
      console.error('Signup error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;




// import React, { useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';


// const Signup = () => {
//   const { signup } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await signup(email, password);
//       navigate('/'); // Redirect to home page after successful signup
//     } catch (error) {
//       setError('Failed to sign up. Please try again.');
//       console.error('Signup error:', error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//         <form onSubmit={handleSignup}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-center">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-500 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;