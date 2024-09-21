import React, { useEffect } from 'react';
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const LyricsDisplay = ({ artist, title }) => {
  const { fetchLyrics, lyrics } = useContext(PlayerContext);

  useEffect(() => {
    if (artist && title) {
      fetchLyrics(artist, title);
    }
  }, [artist, title, fetchLyrics]);

  return (
    <div className="lyrics-container">
      <h2>{title} by {artist}</h2>
      <pre className="lyrics">{lyrics}</pre>
    </div>
  );
};

export default LyricsDisplay;
