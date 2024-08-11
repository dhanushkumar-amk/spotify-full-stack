import React, {useContext} from 'react';import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import {PlayerContext} from './context/PlayerContext';
import {ToastContainer} from 'react-toastify';
import {Route, Routes} from 'react-router-dom';
import LikedAlbums from './components/LikedAlbum';

const App = () => {
  const {audioRef, track, songsData} = useContext(PlayerContext);

  //  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* {showLogin ? <Login/> : <></>} */}

      <div className='h-screen bg-black'>
        <ToastContainer />
        {songsData.length !== 0 ? (
          <>
            <div className='h-[90%] flex'>
              <Sidebar />
              <Routes>
                {/* Other routes */}
                <Route
                  path='/liked-albums'
                  element={<LikedAlbums />}
                />
              </Routes>
              <Display />
            </div>
            <Player />
          </>
        ) : (
          ''
        )}

        <audio
          ref={audioRef}
          src={track ? track.file : ''}
          preload='auto'></audio>
      </div>
    </>
  );
};

export default App;
