import React, {useContext, useState} from 'react';import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import {PlayerContext} from '../context/PlayerContext';
import Login from './Login/Login';

const DisplayHome = () => {
  const {filteredSongs, filteredAlbums} = useContext(PlayerContext);
  const [showLogin, setShowLogin] = useState(false);

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // 6 columns
    gap: '10px', // Space between items
  };

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}

      <Navbar setShowLogin={setShowLogin} />
      <div className='p-4'>
        <h1 className='my-5 font-bold text-3xl text-white'>Albums List</h1>
        <div style={gridContainerStyle}>
          {filteredAlbums.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>

        <h1 className='my-5 font-bold text-3xl text-white'>
          All songs for You
        </h1>
        <div style={gridContainerStyle}>
          {filteredSongs.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
