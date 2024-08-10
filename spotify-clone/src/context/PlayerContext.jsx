import {createContext, useEffect, useRef, useState} from 'react';import axios from 'axios';
import {toast} from 'react-toastify';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const url = 'http://localhost:4000';

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

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

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

  const playWithId = async (id) => {
    if (!token) {
      toast.error('Please log in to play a song.');
      return;
    }

    const selectedTrack = songsData.find((item) => item._id === id);

    if (selectedTrack) {
      if (track?._id === selectedTrack._id && playStatus) {
        pause();
      } else {
        setTrack(selectedTrack);

        if (audioRef.current) {
          audioRef.current.src = selectedTrack.url;

          if (!selectedTrack.url) {
            console.error('Invalid URL:', selectedTrack.url);
            return;
          }

          console.log('Playing track:', selectedTrack.name);

          try {
            await audioRef.current.play();
            setPlayStatus(true);
          } catch (error) {
            console.error('Error playing the track:', error);
            setPlayStatus(false);
          }
        } else {
          console.error('Audio reference is not initialized');
        }
      }
    } else {
      console.error('Selected track not found with ID:', id);
    }
  };

  const previous = async () => {
    const currentIndex = songsData.findIndex(
      (item) => track && track._id === item._id
    );
    if (currentIndex > 0) {
      const previousTrack = songsData[currentIndex - 1];
      setTrack(previousTrack);
      if (audioRef.current) {
        audioRef.current.src = previousTrack.url;
        try {
          await audioRef.current.play();
          setPlayStatus(true);
        } catch (error) {
          console.error('Error playing the track:', error);
          setPlayStatus(false);
        }
      }
    } else {
      toast.info('No previous song available');
    }
  };

  const next = async () => {
    let currentIndex = songsData.findIndex(
      (item) => track && track._id === item._id
    );
    if (isShuffling) {
      currentIndex = Math.floor(Math.random() * songsData.length);
      setPlayStatus(true);
    } else {
      currentIndex++;
    }

    if (currentIndex < songsData.length) {
      const nextTrack = songsData[currentIndex];
      setTrack(nextTrack);
      if (audioRef.current) {
        audioRef.current.src = nextTrack.url;
        try {
          await audioRef.current.play();
          setPlayStatus(true);
        } catch (error) {
          console.error('Error playing the track:', error);
          setPlayStatus(false);
        }
      }
    } else {
      toast.info('No next song available');
    }
  };

  const seekSong = (e) => {
    if (audioRef.current && seekBg.current) {
      const seekPercentage = e.nativeEvent.offsetX / seekBg.current.offsetWidth;
      audioRef.current.currentTime = seekPercentage * audioRef.current.duration;
    }
  };

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
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        updateSeekbar();
      }
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', updateSeekbar);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        audio.removeEventListener('timeupdate', updateSeekbar);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [audioRef, isLooping, next]);

  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
  };

  const toggleShuffle = () => {
    setIsShuffling((prev) => !prev);
  };

  const changeVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

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

  const downloadSong = async (trackId) => {
    try {
      const response = await axios.get(`${url}/api/song/download/${trackId}`, {
        responseType: 'blob', // Ensure the response is a blob
      });

      // Create a link element to download the file
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `song-${trackId}.mp3`); // Specify a default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the song:', error);
      toast.error('Error downloading the song.');
    }
  };

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
    downloadSong,
    handleSearch,
    searchTerm,
    volume,
    setVolume,
    changeVolume,
    isLoggedIn,
    handleLogin,
    handleLogout,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
