import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaBlog, FaQuestionCircle, FaEnvelope, FaHome, FaUser } from 'react-icons/fa'; // Importing icons
import { PlayerContext } from '../context/PlayerContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const navigate = useNavigate();
  
  const {
    token,
    
  } = useContext(PlayerContext);
  
  // Navigate to profile page
  const goToProfile = () => {
    if (token) {
      navigate('/profile');
    }
    else{
      toast.error("pls login")
    }
  };
  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
      {/* Top section with Home and Spotify Logo */}
      <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-center items-center'>
        <div
          onClick={() => navigate('/')} // Navigate to Home on click
          className='cursor-pointer'>
          <img
            className='w-40'
            src='https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg'
            alt='Spotify Logo'
          />
        </div>
      </div>

      {/* Quick Links Section */}
      <div className='bg-[#121212] h-[85%] rounded mt-4 flex flex-col justify-center items-center p-6'>
        <div
          className='flex items-center gap-3 text-white cursor-pointer mb-4'
          onClick={() => navigate('/')} // Home link
        >
          <FaHome className='text-[18px]' /> {/* Home Icon */}
          <p>Home</p>
        </div>
       
        <div
          className='flex items-center gap-3 text-white cursor-pointer mb-4'
          onClick={() => navigate('/blog')}>
          <FaBlog className='text-[18px]' /> {/* Blog Icon */}
          <p>Blog</p>
        </div>
        <div
          className='flex items-center gap-3 text-white cursor-pointer mb-4'
          onClick={() => navigate('/faq')}>
          <FaQuestionCircle className='text-[18px]' /> {/* FAQ Icon */}
          <p>FAQ</p>
        </div>
        <div
          className='flex items-center gap-3 text-white cursor-pointer mb-4'
          onClick={() => navigate('/contact')}>
          <FaEnvelope className='text-[18px]' /> {/* Contact Icon */}
          <p>Contact</p>
        </div>
        
        <div
          className='flex items-center gap-3 text-white cursor-pointer mb-4'
          onClick={goToProfile}
          >
          <FaUser className='text-[18px]' /> {/* Contact Icon */}
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
