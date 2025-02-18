import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import InputBox from '../components/InputBox';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user

  // Fetch users from Firestore
  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (querySnapshot) => {
      const userList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
      setLoading(false);
    });

    return () => unsubscribeUsers();
  }, []);

  // Fetch messages for the selected user
  useEffect(() => {
    if (!selectedUser) {
      setMessages([]); // Clear messages if no user is selected
      return;
    }

    const messagesQuery = query(
      collection(db, 'messages'),
      where('senderId', 'in', [currentUser.uid, selectedUser.id]),
      where('receiverId', 'in', [currentUser.uid, selectedUser.id]),
      orderBy('timestamp', 'asc')
    );

    const unsubscribeMessages = onSnapshot(messagesQuery, (querySnapshot) => {
      const messageList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(messageList);
    });

    return () => unsubscribeMessages();
  }, [selectedUser, currentUser]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      try {
        await addDoc(collection(db, 'messages'), {
          senderId: currentUser.uid,
          receiverId: selectedUser.id,
          text: newMessage,
          timestamp: new Date(),
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Show loading state
  if (loading) {
    return <p>Loading users...</p>;
  }

  // Redirect if user is not logged in
  if (!currentUser) {
    return <p>Please log in to access the chat.</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        users={users}
        currentUser={currentUser}
        onLogout={logout}
        onSelectUser={setSelectedUser}
        selectedUser={selectedUser} // Pass the selected user
      />

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Chat Window */}
        <ChatWindow messages={messages} currentUser={currentUser} />

        {/* Input Box */}
        <InputBox
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={handleSendMessage}
          disabled={!selectedUser} // Disable input if no user is selected
        />
      </div>
    </div>
  );
};

export default Home;


// import React, { useState, useEffect } from 'react'; // Add useEffect here
// import { useAuth } from '../hooks/useAuth';
// import { useChat } from '../hooks/useChat';
// import Sidebar from '../components/Sidebar';
// import ChatWindow from '../components/ChatWindow';
// import InputBox from '../components/InputBox';

// import {  collection, onSnapshot, addDoc, query, where, orderBy  } from 'firebase/firestore';
// import { db } from '../firebase/firestore';

// const Home = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { currentUser, logout } = useAuth();
//   const { messages, sendMessage } = useChat('messages');
//   const [newMessage, setNewMessage] = useState('');
  

//   // Fetch users from Firestore
//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'users'), (querySnapshot) => {
//       const userList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setUsers(userList);
//       console.log('Users fetched:', userList);
//       setLoading(false); // Set loading to false after fetching users
//     });

//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, []);

//   // Handle sending a new message
//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       sendMessage(newMessage, currentUser.email); // Use currentUser.email as the sender
//       setNewMessage('');
//     }
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error('Failed to logout:', error.message);
//     }
//   };

//   // Show loading state
//   if (loading) {
//     return <p>Loading users...</p>;
//   }

//   // Redirect if user is not logged in
//   if (!currentUser) {
//     return <p>Please log in to access the chat.</p>;
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar users={users} currentUser={currentUser} onLogout={handleLogout} />

//       {/* Chat Interface */}
//       <div className="flex-1 flex flex-col">
//         {/* Chat Window */}
//         <ChatWindow messages={messages} />

//         {/* Input Box */}
//         <InputBox
//           newMessage={newMessage}
//           setNewMessage={setNewMessage}
//           onSendMessage={handleSendMessage}
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;