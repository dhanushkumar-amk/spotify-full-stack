import React, {useContext, useState, useEffect} from 'react';import {useParams} from 'react-router-dom';
import {PlayerContext} from '../context/PlayerContext';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {assets} from '../assets/assets'; // Ensure this import is correct
import toast from 'react-hot-toast';
// import {toast} from 'react-toastify';

// Helper function to convert duration from "mm:ss" to seconds
const durationToSeconds = (duration) => {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
};

// Helper function to convert seconds to "mm:ss" format
const secondsToDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

// Helper function to calculate time ago from a date
const timeAgo = (date) => {
  const now = new Date();
  const uploadDate = new Date(date);
  const diffInMs = now - uploadDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return `${diffInDays} days ago`;
};

const DisplayAlbum = () => {
  const {id} = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [isLiked, setIsLiked] = useState(false); // State to manage like status
  const [likeCount, setLikeCount] = useState(100); // Default like count
  const [isFollowing, setIsFollowing] = useState(false); // State to manage follow status
  const [followerCount, setFollowerCount] = useState(100000); // Default follower count
  const {playWithId, albumsData, songsData} = useContext(PlayerContext);

  useEffect(() => {
    if (albumsData) {
      const fetchAlbumData = () => {
        const foundAlbum = albumsData.find((item) => item._id === id);
        setAlbumData(foundAlbum);
      };

      fetchAlbumData();
    }
  }, [id, albumsData]);

  if (!albumData) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  // Calculate song count and total duration dynamically
  const filteredSongs = songsData.filter(
    (item) => item.album === albumData.name
  );
  const songCount = filteredSongs.length;
  const totalDurationInSeconds = filteredSongs.reduce(
    (total, item) => total + durationToSeconds(item.duration),
    0
  );
  const totalDuration = secondsToDuration(totalDurationInSeconds);

  // Toggle like status and increase like count
  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikeCount((prevCount) => prevCount + (isLiked ? -1 : 1)); // Increase or decrease like count
  };

  // Toggle follow status and update follower count
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount((prevCount) => prevCount + (isFollowing ? -1 : 1));
    // Increase or decrease follower count
    if (!isFollowing) toast.success('Thanks for following');
    else alert('Sure you want to unfollow');
  };

  return (
    <>
      <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <img
          className='w-48 rounded'
          src={albumData.image}
          alt={albumData.name}
        />
        <div className='flex flex-col'>
          <p>Playlist</p>
          <h2 className='text-5xl font-bold mb-4 md:text-7xl'>
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className='mt-1'>
            <img
              className='inline-block w-5 mr-1'
              src={assets.spotify_logo}
              alt='Spotify Logo'
            />
            <b className=' mr-7'>Spotify</b> {likeCount} likes{' '}
            <b className='ml-7 mr-7'>{songCount} songs</b> about {totalDuration}
          </p>
          <div className='mt-4 flex items-center gap-4'>
            <button
              onClick={handleLikeToggle}
              className={`flex items-center ${
                isLiked ? 'text-red-500' : 'text-gray-500'
              }`}>
              {isLiked ? (
                <AiFillHeart className='w-6 h-6 mr-2' />
              ) : (
                <AiOutlineHeart className='w-6 h-6 mr-2' />
              )}
              {isLiked ? 'Liked' : 'Like'}
            </button>
            <button
              onClick={handleFollowToggle}
              className={`flex items-center bg-green-500 ml-6 text-white px-3 py-1 rounded-full ${
                isFollowing ? 'bg-gray-500' : ''
              }`}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
            <span className='text-white'>{followerCount} followers</span>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p>
          <b className='mr-4'>#</b>Title
        </p>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <img
          className='m-auto w-4'
          src={assets.clock_icon}
          alt='Clock Icon'
        />
      </div>
      <hr />
      {filteredSongs.map((item, index) => (
        <div
          onClick={() => playWithId(item._id)}
          key={item._id}
          className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
          <p className='text-white'>
            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
            <img
              className='inline w-10 mr-5'
              src={item.image}
              alt={item.name}
            />
            {item.name}
          </p>
          <p className='text-[15px]'>{albumData.name}</p>
          <p className='text-[15px] hidden sm:block'>
            {/* {timeAgo(item.uploadDate)} */}1 year ago
          </p>
          <p className='text-[15px] text-center'>{item.duration}</p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
