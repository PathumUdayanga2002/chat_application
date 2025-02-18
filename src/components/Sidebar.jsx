import React from 'react';

const Sidebar = ({ users, currentUser, onLogout, onSelectUser, selectedUser }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Users</h2>
      <ul>
        {users
          .filter((user) => user.id !== currentUser.uid) // Exclude the current user
          .map((user) => (
            <li
              key={user.id}
              className={`mb-2 flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg ${
                selectedUser?.id === user.id ? 'bg-blue-100' : ''
              }`}
              onClick={() => onSelectUser(user)} // Set the selected user
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-gray-700">{user.name || user.email}</span>
            </li>
          ))}
      </ul>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={onLogout}
          className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


// import React from 'react';

// const Sidebar = ({ users = [] ,currentUser,onLogout }) => {
//   return (
//     <div className="w-64 bg-white border-r border-gray-200 p-4">
//       <h2 className="text-lg font-semibold mb-4">Users</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id} className="mb-2 flex items-center">
//             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//             <span className="text-gray-700">{user.email}</span>
//           </li>
//         ))}
//       </ul>
//        {/* Logout Button */}
//        <div className="mt-6">
//         <button
//           onClick={onLogout}
//           className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;