import React from 'react';
import { FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';
import styles from '../../styles/MusicPlayer.module.css';

const PlayerControls = ({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick }) => {
  return (
    <div className={styles.playerControls}>
      <FaBackward 
        className={styles.controlIcon} 
        title="Previous" 
        onClick={onPrevClick} 
      />
      
      {isPlaying ? (
        <FaPause 
          className={`${styles.controlIcon} ${styles.playButton}`} 
          title="Pause" 
          onClick={onPlayPauseClick} 
        />
      ) : (
        <FaPlay 
          className={`${styles.controlIcon} ${styles.playButton}`} 
          title="Play" 
          onClick={onPlayPauseClick} 
        />
      )}
      
      <FaForward 
        className={styles.controlIcon} 
        title="Next" 
        onClick={onNextClick} 
      />
    </div>
  );
};

export default PlayerControls;