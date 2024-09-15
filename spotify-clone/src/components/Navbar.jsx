import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { FiUser } from 'react-icons/fi'; // Default user icon

const Navbar = ({ setShowLogin }) => {
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
  const [profilePic, setProfilePic] = useState(''); // State for storing profile picture URL

  useEffect(() => {
    const storedProfilePic =
      JSON.parse(localStorage.getItem('userData'))?.profilePic || '';
    setProfilePic(storedProfilePic);
  }, [token]); // Update profile picture if token changes

  // Handle navigation based on login status
  const handleClick = (path) => {
    if (!token) {
      toast.info('Please log in to access this feature');
      setShowLogin(true);
    } else {
      navigate(path);
    }
  };

  // Handle changes in search input
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // If the search input is cleared
    if (query.trim() === '') {
      setSearchResults([]); // Reset search results
      setNoResults(false); // Reset no results message
      navigate('/'); // Navigate back to home
    }
  };

  // Handle the search submit
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      const results = await handleSearch(searchQuery);
      setSearchResults(results);
      setNoResults(results.length === 0);
      toast.info(`Searching for: ${searchQuery}`);
    }
  };

  // Redirect to Spotify download page
  const redirectToSpotify = () => {
    window.location.href = 'https://www.spotify.com/download';
  };

  // Navigate to profile page
  const goToProfile = () => {
    if (token) {
      navigate('/profile');
    }
  };

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        {/* Navigation arrows */}
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

        {/* Search bar */}
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

        {/* Profile / Login buttons */}
        <div className='flex items-center gap-4'>
          {token ? (
            <>
              {/* Premium link */}
              <p
                onClick={() => handleClick('/premium')}
                className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>
                Explore Premium
              </p>
              {/* Install app link */}
              <p
                onClick={redirectToSpotify}
                className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>
                Install App
              </p>
              {/* Profile icon */}
              <div className='navbar-profile cursor-pointer'>
                <p
                  className='bg-green-500 text-black w-7 h-7 rounded-full flex items-center justify-center'
                  onClick={goToProfile} // Add click handler to navigate to profile
                >
                  {/* Display profile picture if available, otherwise default icon */}
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt='Profile'
                      className='w-full h-full rounded-full object-cover'
                    />
                  ) : (
                    <FiUser />
                  )}
                </p>
              </div>
            </>
          ) : (
            // If not logged in, show login icon
            <p
              onClick={() => setShowLogin(true)}
              className='bg-red-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer'>
              <FiUser />
            </p>
          )}
        </div>
      </div>

      {/* Category navigation when logged in */}
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
                Albums
              </p>
            </>
          )}
        </div>
      )}

      {/* No results message */}
      {searchQuery && noResults && (
        <div className='mt-4 text-white text-center'>
          No songs or albums found
        </div>
      )}
    </>
  );
};

export default Navbar;
