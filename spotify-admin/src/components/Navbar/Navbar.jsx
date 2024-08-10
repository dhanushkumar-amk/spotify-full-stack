import React from 'react';import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({isLoggedIn, onLogin, onLogout, setShowAuth}) => {
  const handleLogout = () => {
    onLogout();
    toast.success('Logged out successfully!');
  };

  return (
    <div className='navbar w-full border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg flex justify-between items-center'>
      <div className='text-xl font-semibold text-gray-900'>
        <p>Spotify Admin</p>
      </div>
      <div className='flex gap-4'>
        {!isLoggedIn ? (
          <button
            onClick={() => setShowAuth(true)}
            className='px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-500'>
            Sign In
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-500'>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
