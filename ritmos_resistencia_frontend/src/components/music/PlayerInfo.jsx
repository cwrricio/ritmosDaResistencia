import React from 'react';
import styles from '../../styles/music/MusicPlayer.module.css';

const PlayerInfo = ({ title, artist }) => {
  return (
    <div className={styles.musicInfos}>
      <h2 className={styles.musicTitle}>{title}</h2>
      <h3 className={styles.musicArtist}>{artist}</h3>
    </div>
  );
};

export default PlayerInfo;