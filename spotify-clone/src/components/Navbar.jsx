import React, {useContext, useState} from 'react';import {useNavigate} from 'react-router-dom';
import {PlayerContext} from '../context/PlayerContext';
import {toast} from 'react-toastify';
import {assets} from '../assets/assets';

const Navbar = ({setShowLogin}) => {
  const navigate = useNavigate();
  const {
    token,
    setToken,
    handleSearch,
    searchResults = [],
    setSearchResults,
  } = useContext(PlayerContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleClick = (path) => {
    if (!token) {
      toast.info('Please log in to access this feature');
      setShowLogin(true);
    } else {
      navigate(path);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      // Reset search results and navigate to home page
      setSearchResults([]);
      setNoResults(false);
      navigate('/');
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery) {
      // Use the context search function to get results and update state
      const results = await handleSearch(searchQuery);
      setSearchResults(results);
      setNoResults(results.length === 0); // Set noResults based on whether any results were found
      toast.info(`Searching for: ${searchQuery}`);
    }
  };

  const redirectToSpotify = () => {
    window.location.href = 'https://www.spotify.com/download';
  };

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
          <img
            onClick={() => navigate(-1)}
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
            src={assets.arrow_left}
            alt='Go Back'
          />
          <img
            onClick={() => navigate(1)}
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer'
            src={assets.arrow_right}
            alt='Go Forward'
          />
        </div>
        <div className='flex items-center flex-1 justify-center'>
          <form
            onSubmit={handleSearchSubmit}
            className='flex items-center w-full max-w-md'>
            <input
              type='text'
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder='Search...'
              className='bg-[#121212] text-white px-2 py-1 rounded-full flex-1 border-2 border-gray-500'
            />
            <button
              type='submit'
              className='bg-white text-black px-3 py-1 rounded-full ml-2'>
              Search
            </button>
          </form>
        </div>
        <div className='flex items-center gap-4'>
          {token ? (
            <>
              <p
                onClick={() => handleClick('/premium')}
                className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>
                Explore Premium
              </p>
              <p
                onClick={redirectToSpotify}
                className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>
                Install App
              </p>
              <div className='navbar-profile cursor-pointer'>
                <img
                  src={assets.spotify_logo}
                  className='cursor-pointer'
                  alt='Spotify Logo'
                />
                <ul className='nav-profile-dropdown'>
                  <li
                    onClick={logout}
                    className='cursor-pointer'>
                    <img
                      src={assets.logOut_icon}
                      alt='Logout Icon'
                      className='cursor-pointer'
                    />
                    <p className='cursor-pointer'>Logout</p>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <p
              onClick={() => setShowLogin(true)}
              className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer'>
              G
            </p>
          )}
        </div>
      </div>
      {token && (
        <div className='flex items-center gap-2 mt-4'>
          {!noResults && (
            <>
              <p
                onClick={() => handleClick('/all')}
                className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>
                All
              </p>
              <p
                onClick={() => handleClick('/music')}
                className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>
                Music
              </p>
              <p
                onClick={() => handleClick('/podcasts')}
                className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>
                Podcasts
              </p>
            </>
          )}
        </div>
      )}
      {searchQuery && noResults && (
        <div className='mt-4 text-white text-center'>
          No songs or albums found
        </div>
      )}
    </>
  );
};

export default Navbar;
