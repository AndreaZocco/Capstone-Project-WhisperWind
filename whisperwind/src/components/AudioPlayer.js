import React, { useEffect, useRef } from 'react';
import '../CSS/AudioPlayer.css';

const AudioPlayer = ({ track }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const handlePlay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.load();
          await audioRef.current.play();
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      }
    };

    handlePlay();
  }, [track]);

  return (
    <div className="audio-player">
      <img src={track.imageUrl} alt={track.title} className="audio-player-image" />
      <div className="audio-player-details">
        <h3>{track.title}</h3>
        <p>{track.author}</p>
      </div>
      <div className="audio-player-controls">
        <audio ref={audioRef} controls>
          <source src={track.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;
