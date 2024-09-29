import {createContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
// import {toast} from 'react-toastify';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const url = 'https://spotify-backend-1-igxg.onrender.com';

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumData] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [token, setToken] = useState('');
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [volume, setVolume] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [time, setTime] = useState({
    currentTime: {second: 0, minute: 0},
    totalTime: {second: 0, minute: 0},
  });

  
  const [queue, setQueue] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  // const [lyrics, setLyrics] = useState('');

  
  
  
  // Persist user login status
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Play/Pause functionality
  const play = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setPlayStatus(true))
        .catch((error) => {
          console.error('Error playing the track:', error);
          setPlayStatus(false);
        });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  // Play track by id
  const playWithId = async (id) => {
    await songsData.map((item) => {
        if (id === item._id) {
            setTrack(item);
        }
    })
        ;
    await audioRef.current.play();
    setPlayStatus(true);
}


  const previous = async () => {
    songsData.map(async (item, index) => {
        if (track._id === item._id && index > 0) {
            await setTrack(songsData[index - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    })

}

const next = async () => {
    songsData.map(async (item, index) => {
        if (track._id === item._id && index < songsData.length-1) {
            await setTrack(songsData[index + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    })
}

  // Seek functionality
  const seekSong = (e) => {
    if (audioRef.current && seekBg.current) {
      const seekPercentage = e.nativeEvent.offsetX / seekBg.current.offsetWidth;
      audioRef.current.currentTime = seekPercentage * audioRef.current.duration;
    }
  };
 
  // Fetch songs and albums from backend
  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setFilteredSongs(response.data.songs);
      if (response.data.songs.length > 0) {
        setTrack(response.data.songs[0]);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumData(response.data.albums);
      setFilteredAlbums(response.data.albums);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  // Update seek bar
  useEffect(() => {
    const updateSeekbar = () => {
      if (audioRef.current && seekBar.current) {
        const {currentTime, duration} = audioRef.current;
        if (duration > 0) {
          seekBar.current.style.width = `${Math.floor(
            (currentTime / duration) * 100
          )}%`;
          setTime({
            currentTime: {
              second: Math.floor(currentTime % 60),
              minute: Math.floor(currentTime / 60),
            },
            totalTime: {
              second: Math.floor(duration % 60),
              minute: Math.floor(duration / 60),
            },
          });
        }
      }
    };

    const handleEnded = () => {
      if (isLooping && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .catch((error) => console.error('Error playing the track:', error));
      } else {
        next();
        // updateSeekbar();
      }
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', updateSeekbar);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateSeekbar);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [isLooping, next]);

  // Toggle shuffle/loop, volume control
  const toggleLoop = () => setIsLooping((prev) => !prev);
  const toggleShuffle = () => setIsShuffling((prev) => !prev);
  const changeVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Search functionality
  const handleSearch = (term) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase().trim();
    const words = lowercasedTerm.split(/\s+/);

    const searchInText = (text) =>
      words.every((word) => text.toLowerCase().includes(word));

    setFilteredSongs(
      songsData.filter(
        (song) => searchInText(song.name) || searchInText(song.desc)
      )
    );

    setFilteredAlbums(
      albumsData.filter(
        (album) => searchInText(album.name) || searchInText(album.desc)
      )
    );
  };

  // Login and Logout functionality
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsLoggedIn(false);
  };

   // Function to add a song to the queue
   const addToQueue = (song) => {
    setQueue((prevQueue) => [...prevQueue, song]);
  };

  // Function to play the next song in the queue
  const playNextInQueue = () => {
    if (queue.length > 0) {
      const nextSong = queue[0]; // Get the next song
      setTrack(nextSong);
      setQueue((prevQueue) => prevQueue.slice(1)); // Remove it from the queue
      audioRef.current.play();
    }
  };

  // Mute/Unmute functionality
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    audioRef.current.volume = isMuted ? volume : 0; // Set volume to 0 or previous volume
  };

  // UseEffect to handle song end
  useEffect(() => {
    const handleEnded = () => {
      if (isLooping) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        // Play next song in the queue if available
        playNextInQueue();
        seekBar.current.style.width = '0%'; // Reset seek bar
      }
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', handleEnded);
      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [isLooping, queue]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
    filteredSongs,
    filteredAlbums,
    url,
    token,
    setToken,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
    handleSearch,
    searchTerm,
    volume,
    setVolume,
    changeVolume,
    isLoggedIn,
    handleLogin,
    handleLogout,
  addToQueue ,
  playNextInQueue,
  toggleMute,
    
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
