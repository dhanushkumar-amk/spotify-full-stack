// src/App.js
import React, {useContext, useState, useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import {PlayerContext} from './context/PlayerContext';
// import {ToastContainer} from 'react-toastify';
import LikedAlbums from './components/LikedAlbum';
import Premium from './components/premium/Premium';
import Profile from './components/Profile'; 
import  toast, {Toaster}  from 'react-hot-toast';

const App = () => {
  const {audioRef, track, songsData} = useContext(PlayerContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Loading state

  // Check if the current path is the Premium page
  const isPremiumPage = location.pathname === '/premium';

  // Simulate a loading effect for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulates a delay (replace with real data fetching)

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);


  return (
    <>
    <div className='h-screen bg-black'>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    
      {/* <ToastContainer/> */}
      {loading ? ( // Show loader when loading is true
        <div className='loader-container'>
          <div className='spinner'></div> {/* Custom spinner */}
        </div>
      ) : (
        songsData.length !== 0 && (
          <div className='h-[90%] flex'>
            {!isPremiumPage && <Sidebar />}
            <Routes>
              <Route
                path='/liked-albums'
                element={<LikedAlbums />}
              />
              <Route
                path='/premium'
                element={<Premium />}
              />
              <Route
                path='/profile'
                element={<Profile />}
              />
              {/* Add other routes here */}
            </Routes>
            {!isPremiumPage && <Display />}
          
          </div>
        )
      )}
      {!isPremiumPage && <Player />}
      <audio
        ref={audioRef}
        src={track ? track.file : ''}
        preload='auto'></audio>
    </div>
  </>
  );
};

export default App;
