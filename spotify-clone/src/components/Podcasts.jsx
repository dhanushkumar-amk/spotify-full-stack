import React, { useEffect, useState } from 'react';

// Simulate fetching data (replace this with your actual API call)
const fetchPodcasts = async () => {
  // Simulating an API call
  return [
    { id: 1, title: 'Podcast 1', cover: 'url_to_cover_image_1' },
    { id: 2, title: 'Podcast 2', cover: 'url_to_cover_image_2' },
    // Add more podcasts
  ];
};

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        const data = await fetchPodcasts();
        setPodcasts(data);
      } catch (error) {
        setError('Failed to fetch podcasts');
      } finally {
        setLoading(false);
      }
    };

    loadPodcasts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='podcasts-container'>
      {podcasts.length > 0 ? (
        <div className='podcasts-grid'>
          {podcasts.map((podcast) => (
            <div key={podcast.id} className='podcast-card'>
              <img src={podcast.cover} alt={podcast.title} className='podcast-cover' />
              <h3 className='podcast-title'>{podcast.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div>No podcasts available</div>
      )}
    </div>
  );
};

export default Podcasts;
