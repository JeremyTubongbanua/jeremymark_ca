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
        setProgress(data.progress_ms); // Initialize progress
      } catch (error) {
        console.error('Error fetching currently playing track:', error);
      }
    };

    fetchCurrentlyPlaying();

    // Poll the API every 5 seconds to update the currently playing track
    const interval = setInterval(fetchCurrentlyPlaying, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!track || !track.item) return;

    const start = Date.now();
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const elapsed = Date.now() - start;
        const newProgress = track.progress_ms + elapsed;
        if (newProgress >= track.item.duration_ms) {
          clearInterval(interval);
          return track.item.duration_ms;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
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
        <h2 className="text-white text-xl font-semibold">
          <a
            href={external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400"
          >
            "{name}"
          </a>{' '}
          by{' '}
          {artists.map((artist, index) => (
            <span key={artist.id}>
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                {artist.name}
              </a>
              {index < artists.length - 1 && ', '}
            </span>
          ))}
        </h2>
        <p className="text-gray-400">
          Album:{' '}
          <a
            href={album.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400"
          >
            {album.name}
          </a>
        </p>
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
