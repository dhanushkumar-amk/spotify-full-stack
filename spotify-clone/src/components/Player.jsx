import { useContext, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { FaDownload, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets';

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
    toggleMute,
    isMuted,
    // handleDownload,
    // downloadSongFromCloudinary,
    token,
  } = useContext(PlayerContext);

  const isLoggedIn = Boolean(token);

  const handleToggleLoop = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to use this feature.');
      return;
    }
    toggleLoop();
    toast(isLooping ? 'Loop mode disabled' : 'Loop mode enabled', {
      icon: isLooping ? '📴' : '🔁',
    });
  };

  const handleToggleShuffle = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to use this feature.');
      return;
    }
    toggleShuffle();
    toast(isShuffling ? 'Shuffle mode disabled' : 'Shuffle mode enabled', {
      icon: isShuffling ? '❌' : '🔀',
    });
  };

  const handleAddToQueue = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to use this feature.');
      return;
    }
    if (track) {
      addToQueue(track);
      toast.success('Track added to queue');
    } else {
      toast.error('No track selected');
    }
  };

  const handleDownload = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to use this feature.');
      return;
    }
    if (track) {
      // downloadSongFromCloudinary(track._id);
      toast.success('Downloading...');
    } else {
      toast.error('No track selected for download');
    }
  };

  const handleMute = () => {
    toggleMute();
    if (isMuted) {
      changeVolume(1); // Restore volume when unmuted
      toast('Unmuted');
    } else {
      changeVolume(0); // Set volume to 0 when muted
      toast('Muted');
    }
  };

  useEffect(() => {
    const checkIfSongEnded = () => {
      if (time.currentTime.minute === 0 && time.currentTime.second === 0) {
        next();
        seekBar.current.style.width = '0%';
      }
    };

    if (playStatus) {
      const intervalId = setInterval(checkIfSongEnded, 1000);
      return () => clearInterval(intervalId);
    }
  }, [playStatus, time.currentTime, next]);

  return track ? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <style jsx>{`
        .filter-green {
          filter: brightness(0) saturate(100%) invert(55%) sepia(72%) saturate(595%) hue-rotate(89deg) brightness(95%) contrast(95%);
        }
        .disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12' src={track.image} alt={track.name} />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>

      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
          <img
            onClick={handleToggleShuffle}
            className={`w-4 cursor-pointer ${isShuffling ? 'filter-green' : ''}`}
            src={assets.shuffle_icon}
            alt='Shuffle'
          />
          <img
            onClick={isLoggedIn ? previous : () => toast.error('Please log in to use this feature.')}
            className='w-4 cursor-pointer'
            src={assets.prev_icon}
            alt='Previous'
          />
          {playStatus ? (
            <img
              onClick={isLoggedIn ? pause : () => toast.error('Please log in to use this feature.')}
              className='w-4 cursor-pointer'
              src={assets.pause_icon}
              alt='Pause'
            />
          ) : (
            <img
              onClick={isLoggedIn ? play : () => toast.error('Please log in to use this feature.')}
              className='w-4 cursor-pointer'
              src={assets.play_icon}
              alt='Play'
            />
          )}
          <img
            onClick={isLoggedIn ? next : () => toast.error('Please log in to use this feature.')}
            className='w-4 cursor-pointer'
            src={assets.next_icon}
            alt='Next'
          />
          <img
            onClick={handleToggleLoop}
            className={`w-4 cursor-pointer ${isLooping ? 'filter-green' : ''}`}
            src={assets.loop_icon}
            alt='Loop'
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
        <img className='w-4 cursor-pointer' src={assets.mic_icon} alt='Mic' />
        <img
          onClick={handleAddToQueue}
          className={`w-4 cursor-pointer ${!track ? 'disabled' : ''}`}
          src={assets.queue_icon}
          alt='Add to Queue'
        />
        <div onClick={handleMute} className='cursor-pointer'>
          {isMuted ? (
            <FaVolumeMute className='w-4 filter-green' title='Unmute' />
          ) : (
            <FaVolumeUp className='w-4' title='Mute' />
          )}
        </div>
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={isMuted ? 0 : volume} // Show 0 volume when muted
          onChange={changeVolume}
          className='w-30 h-3 cursor-pointer accent-green-500'
        />
        {track && (
          <FaDownload
          // onClick={() => handleDownload(track._id)}
          download={assets.arrow_icon}
            className='w-4 cursor-pointer'
            title='Download'
            // download
          />
        )}
      </div>
    </div>
  ) : null;
};

export default Player;
