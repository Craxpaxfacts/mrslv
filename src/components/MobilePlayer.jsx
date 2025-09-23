// src/components/MobilePlayer.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { setVolume01, getVolume01 } from '../lib/audioController';
import './MobilePlayer.css';

// Иконки в стиле Яндекс.Музыки
const PlayIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.68L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"/>
  </svg>
);

const PrevIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"/>
  </svg>
);

const NextIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zM8.43 16.17l5.77-4.07c.57-.4.57-1.24 0-1.64L8.43 6.39C7.76 5.92 6.84 6.4 6.84 7.21v8.58c0 .81.91 1.28 1.58.82z"/>
  </svg>
);

const VolumeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"/>
  </svg>
);

const MobilePlayer = ({ tracks, projectId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [volume, setVolume] = useState(getVolume01() * 100);
  const [progress, setProgress] = useState(0);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const { isPlaying, currentIndex, playAt, currentTime, duration } = useAudioPlayer(`mobile-${projectId}`);

  useEffect(() => {
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  }, [currentTime, duration]);

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setVolume01(newVolume / 100);
  };

  const handleProgressChange = (e) => {
    const newProgress = parseInt(e.target.value);
    setProgress(newProgress);
    // Здесь можно добавить логику перемотки трека
  };

  const playTrack = (index) => {
    if (tracks[index]) {
      playAt(tracks[index].audio, index);
    }
  };

  const nextTrack = () => {
    const nextIndex = (activeIndex + 1) % tracks.length;
    setActiveIndex(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = activeIndex === 0 ? tracks.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  // Touch-swipe navigation
  const onTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].clientX;
    touchEndXRef.current = e.changedTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndXRef.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = () => {
    const deltaX = touchEndXRef.current - touchStartXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        nextTrack();
      } else {
        prevTrack();
      }
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mobile-player">
      <div className="mobile-player-background">
        <div className="background-blur" style={{
          backgroundImage: `url(${tracks[activeIndex]?.cover || ''})`,
        }} />
      </div>

      <div className="mobile-player-content">
        <div className="album-art-container">
          <div
            className="album-swiper"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="album-card">
              <img src={tracks[activeIndex]?.cover} alt={tracks[activeIndex]?.title || 'Album Cover'} />
              <div className="album-glow" />
            </div>
          </div>
        </div>

        {/* Заголовок и прогресс-бар удалены по требованию */}

        <div className="controls">
          <button className="control-btn prev-btn" onClick={prevTrack}>
            <PrevIcon />
          </button>
          
          <button 
            className="control-btn play-btn"
            onClick={() => playTrack(activeIndex)}
          >
            {isPlaying && currentIndex === activeIndex ? <PauseIcon /> : <PlayIcon />}
          </button>
          
          <button className="control-btn next-btn" onClick={nextTrack}>
            <NextIcon />
          </button>
        </div>

        <div className="volume-section">
          <VolumeIcon />
          <div className="volume-container">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <div className="volume-fill" style={{ width: `${volume}%` }} />
          </div>
          <span className="volume-value">{volume}</span>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;
