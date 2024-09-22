import React, { useContext, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';
import Login from './Login/Login';

const DisplayHome = () => {
  const { filteredSongs, filteredAlbums } = useContext(PlayerContext);
  const [showLogin, setShowLogin] = useState(false);
  const [visibleSongs, setVisibleSongs] = useState(15); // Initially show 15 songs
  const [filter, setFilter] = useState('All'); // State for the filter option

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
  };

  // Toggle visibility of songs
  const toggleVisibility = () => {
    setVisibleSongs((prev) => (prev === 15 ? filteredSongs.length : 15)); // Show all or just 15
  };

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />

      <div className='flex items-center gap-2 mt-4'>
        <p
          onClick={() => setFilter('All')}
          className={`px-4 py-1 rounded-2xl cursor-pointer ${
            filter === 'All' ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          All {/* show both song and albums */}
        </p>
        <p
          onClick={() => setFilter('Music')}
          className={`px-4 py-1 rounded-2xl cursor-pointer ${
            filter === 'Music' ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          Music {/* show songs */}
        </p>
        <p
          onClick={() => setFilter('Albums')}
          className={`px-4 py-1 rounded-2xl cursor-pointer ${
            filter === 'Albums' ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          Albums
        </p>
      </div>

      <div className='p-4'>
        {/* Show albums if filter is All or Albums */}
        {(filter === 'All' || filter === 'Albums') && (
          <>
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
          </>
        )}

        {/* Show songs if filter is All or Music */}
        {(filter === 'All' || filter === 'Music') && (
          <>
            <h1 className='my-5 font-bold text-3xl text-white'>All songs for You</h1>
            <div style={gridContainerStyle}>
              {filteredSongs.slice(0, visibleSongs).map((item, index) => (
                <SongItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                />
              ))}
            </div>
            {/* View More / View Less Button */}
            <div className='flex justify-center mt-4'>
              <button
                onClick={toggleVisibility}
                className='flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all duration-200'
              >
                {visibleSongs === 15 ? (
                  <>
                    <FaChevronDown className='mr-2' /> View More
                  </>
                ) : (
                  <>
                    <FaChevronUp className='mr-2' /> View Less
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DisplayHome;
