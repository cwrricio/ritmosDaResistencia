import React from 'react';
import styles from '../../styles/music/MusicPlayer.module.css';

const ProgressBar = ({ currentTime, duration, onProgressBarClick }) => {
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <div 
        className={styles.playerProgress} 
        onClick={onProgressBarClick}
      >
        <div 
          className={styles.progress} 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      
      <div className={styles.musicDuration}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </>
  );
};

export default ProgressBar;