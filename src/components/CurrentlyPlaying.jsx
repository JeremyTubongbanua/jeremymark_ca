import React, { useState, useEffect } from 'react';

const CurrentlyPlaying = () => {
  const [track, setTrack] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      try {
        const response = await fetch('https://spotify.jeremymark.ca/currently-playing');
        const data = await response.json();
        setTrack(data);
        setProgress(data.progress_ms);  // Initialize progress
      } catch (error) {
        console.error('Error fetching currently playing track:', error);
      }
    };

    fetchCurrentlyPlaying();
  }, []);

  useEffect(() => {
    if (!track || !track.item) return;

    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= track.item.duration_ms) {
          clearInterval(interval);
          return track.item.duration_ms;
        }
        return prevProgress + 1000;  // Increment progress by 1000ms (1 second)
      });
    }, 1000);

    return () => clearInterval(interval);  // Cleanup interval on component unmount
  }, [track]);

  if (!track || !track.item) {
    return <div className="text-center text-white">Not currently playing anything.</div>;
  }

  const { album, artists, name, external_urls, duration_ms } = track.item;

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="max-w-full p-4 bg-gray-900 rounded-lg shadow-lg flex items-center">
      <img
        src={album.images[0].url}
        alt={`${name} album cover`}
        className="w-20 h-20 sm:w-32 sm:h-32 rounded-lg"
      />
      <div className="ml-4 flex-1">
        <h2 className="text-white text-xl font-semibold">{`"${name}" by ${artists.map(artist => artist.name).join(', ')}`}</h2>
        <a
          href={external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 text-sm"
        >
          Listen on Spotify
        </a>
        <div className="mt-2 flex items-center">
          <div className="w-full h-1 bg-gray-700 rounded-full">
            <div
              className="h-1 bg-gray-300 rounded-full"
              style={{ width: `${(progress / duration_ms) * 100}%` }}
            ></div>
          </div>
          <span className="ml-2 text-gray-400 text-sm">
            {formatTime(progress)} of {formatTime(duration_ms)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyPlaying;
