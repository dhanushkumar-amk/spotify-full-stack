import React, {useContext} from 'react';
import {PlayerContext} from '../context/PlayerContext';
import {FaDownload} from 'react-icons/fa'; // Import the download icon
import {assets} from '../assets/assets';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
    toggleLoop,
    isLooping,
    toggleShuffle,
    isShuffling,
    volume,
    changeVolume,
    addToQueue,
    downloadSongFromCloudinary,
  } = useContext(PlayerContext);

  const handleToggleLoop = () => {
    toggleLoop();
    toast.info(isLooping ? 'Loop mode disabled' : 'Loop mode enabled');
  };

  const handleToggleShuffle = () => {
    toggleShuffle();
    toast.info(isShuffling ? 'Shuffle mode disabled' : 'Shuffle mode enabled');
  };

  const handleAddToQueue = () => {
    if (track) {
      addToQueue(track);
      toast.success('Track added to queue');
    } else {
      toast.error('No track selected');
    }
  };

  const handleDownload = () => {
    if (track) {
      downloadSongFromCloudinary(track._id); // Use the new download function
      toast.success('Downloading...');
    } else {
      toast.error('No track selected for download');
    }
  };

  return track ? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <style jsx>{`
        .filter-green {
          filter: brightness(0) saturate(100%) invert(55%) sepia(72%)
            saturate(595%) hue-rotate(89deg) brightness(95%) contrast(95%);
        }
        .disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div className='hidden lg:flex items-center gap-4'>
        <img
          className='w-12'
          src={track.image}
          alt=''
        />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
          <img
            onClick={handleToggleShuffle}
            className={`w-4 cursor-pointer ${
              isShuffling ? 'filter-green' : ''
            }`}
            src={assets.shuffle_icon}
            alt=''
          />
          <img
            onClick={previous}
            className='w-4 cursor-pointer'
            src={assets.prev_icon}
            alt=''
          />
          {playStatus ? (
            <img
              onClick={pause}
              className='w-4 cursor-pointer'
              src={assets.pause_icon}
              alt=''
            />
          ) : (
            <img
              onClick={play}
              className='w-4 cursor-pointer'
              src={assets.play_icon}
              alt=''
            />
          )}
          <img
            onClick={next}
            className='w-4 cursor-pointer'
            src={assets.next_icon}
            alt=''
          />
          <img
            onClick={handleToggleLoop}
            className={`w-4 cursor-pointer ${isLooping ? 'filter-green' : ''}`}
            src={assets.loop_icon}
            alt=''
          />
        </div>
        <div className='flex items-center gap-5'>
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
            <hr
              ref={seekBar}
              className='h-1 border-none w-0 bg-green-800 rounded-full'
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>
      <div className='hidden lg:flex items-center gap-2 opacity-75'>
        <img
          className='w-4 cursor-pointer'
          src={assets.mic_icon}
          alt=''
        />
        <img
          onClick={handleAddToQueue}
          className={`w-4 cursor-pointer ${!track ? 'disabled' : ''}`}
          src={assets.queue_icon}
          alt=''
        />
        <img
          className='w-4'
          src={assets.volume_icon}
          alt=''
        />
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={volume}
          onChange={changeVolume}
          className='w-30 h-3 cursor-pointer accent-green-500'
        />
        {track && (
          <FaDownload
            onClick={handleDownload}
            className='w-4 cursor-pointer'
            title='Download'
            download
          />
        )}
      </div>
    </div>
  ) : null;
};

export default Player;
