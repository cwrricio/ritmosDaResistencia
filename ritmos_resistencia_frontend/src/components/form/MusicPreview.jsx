import React from 'react';
import styles from '../../styles/form/FormArtist.module.css';

const MusicPreview = ({ image, title, artist, visible }) => {
  if (!visible) return null;

  return (
    <div className={styles.previewContainer}>
      <img src={image} alt="Pré-visualização da Capa" className={styles.previewImage} />
      <div className={styles.previewTitle}>{title}</div>
      <div className={styles.previewArtist}>{artist}</div>
    </div>
  );
};

export default MusicPreview;