import React, {useContext} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import {PlayerContext} from './context/PlayerContext';
import {ToastContainer} from 'react-toastify';
import LikedAlbums from './components/LikedAlbum';
import Premium from './components/premium/Premium';
// import Podcasts from './components/Podcasts';
import Profile from './components/Profile';

const App = () => {
  const {audioRef, track, songsData} = useContext(PlayerContext);
  const location = useLocation();

  // Check if the current path is the Premium page
  const isPremiumPage = location.pathname === '/premium';

  return (
    <>
      <div className='h-screen bg-black'>
        <ToastContainer />
        {songsData.length !== 0 ? (
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
             
             <Route path='/profile'
             element={<Profile/>}
             />
            
              {/* Add other routes here */}
            </Routes>
            {!isPremiumPage && <Display />}
          </div>
        ) : null}
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
