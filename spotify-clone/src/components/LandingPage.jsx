// src/components/LandingPage.jsimport React from 'react';
import {useNavigate} from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home'); // Redirect to the MainApp component
  };

  return (
    <div
      className='h-screen w-screen flex flex-col justify-center items-center text-white'
      style={{
        background: `
          linear-gradient(
            to bottom right,
            rgba(0, 0, 0, 0.6), 
            rgba(0, 0, 0, 0.8)
          ),
          url('https://mcdn.wallpapersafari.com/medium/73/36/kjoK1u.png')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      {/* Gradient Background Image */}
      <div
        className='mb-8 relative w-32 h-32 flex justify-center items-center'
        style={{
          background:
            'linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
          borderRadius: '50%',
          overflow: 'hidden',
        }}>
        <img
          src='https://www.logo.wine/a/logo/Spotify/Spotify-Icon-Logo.wine.svg' // Spotify logo
          alt='Spotify Logo'
          className='w-full h-full object-cover'
        />
      </div>

      {/* Headline */}
      <h1 className='text-4xl md:text-6xl font-bold text-center'>
        Music for Everyone
      </h1>

      {/* Subheadline */}
      <p className='mt-4 text-xl md:text-2xl text-center'>
        Millions of songs. No credit card needed.
      </p>

      {/* Get Started Button */}
      <div className='mt-8'>
        <button
          className='bg-green-500 hover:bg-green-600 text-black py-2 px-6 rounded-full text-lg font-semibold'
          onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
