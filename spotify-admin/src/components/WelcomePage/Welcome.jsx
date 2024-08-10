import React from 'react';import {FaSpotify} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const Welcome = ({onShowAuth}) => {
  const navigate = useNavigate();

  const bounceInAnimation = {
    animation: 'bounceIn 1s ease-in-out',
  };

  const fadeInAnimation = {
    animation: 'fadeIn 2s ease-in-out',
  };

  const handleGetStartedClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/add-song');
    } else {
      onShowAuth(); // Notify parent component to show the login modal
      toast.info('Please log in to continue.');
    }
  };

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email'); // Store the email in localStorage on successful login
  const isAdmin = Boolean(token);

  const getUsername = (email) => {
    return email ? email.split('@')[0] : 'Admin';
  };

  // Debugging logs
  console.log('Token:', token);
  console.log('Email:', email);
  console.log('Username:', getUsername(email));

  return (
    <div
      className='flex flex-col items-center justify-center mt-20 h-full p-6 rounded-lg'
      style={fadeInAnimation}>
      <h1
        className='text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center'
        style={bounceInAnimation}>
        <FaSpotify className='text-7xl mr-4' />
        Welcome to Spotify Admin Panel
      </h1>
      <p className='mt-4 text-lg text-gray-700 text-center'>
        Manage your songs, albums, and artists effortlessly from here.
      </p>

      <button
        onClick={handleGetStartedClick}
        className='mt-20 inline-flex items-center px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-500 transition-transform transform hover:scale-105 hover:animate-zoom'>
        <FaSpotify className='mr-3' />
        Get Started
      </button>

      <div className='mt-6 text-lg text-center'>
        {isAdmin ? (
          <p className='text-green-600'>
            Admin verified! Welcome, {getUsername(email)}.
          </p>
        ) : (
          <p className='text-red-600'>
            Verification needed. Please log in to continue.
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .hover\\:animate-zoom:hover {
          animation: zoom 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Welcome;
