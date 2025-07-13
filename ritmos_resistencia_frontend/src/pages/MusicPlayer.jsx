import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayerControls from '../components/music/PlayerControls';
import PlayerInfo from '../components/music/PlayerInfo';
import ProgressBar from '../components/music/ProgressBar';
import styles from '../styles/music/MusicPlayer.module.css';

const MusicPlayer = () => {
  const songs = [
    {
      path: '/assets/musicasplayer/saogonca.mp3',
      displayName: 'São Gonça',
      cover: '/assets/logomusicasplayer/seujorge.jpg',
      artist: 'Seu Jorge',
    },
    {
      path: '/assets/musicasplayer/aloba.mp3',
      displayName: 'A Loba',
      cover: '/assets/logomusicasplayer/alcione2.png',
      artist: 'Alcione',
    },
    {
      path: '/assets/musicasplayer/samurai.mp3',
      displayName: 'Samurai',
      cover: '/assets/logomusicasplayer/djavan.png',
      artist: 'Djavan',
    }
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // Carrega a música quando o componente monta ou quando currentSongIndex muda
    if (audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].path;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Erro ao reproduzir:", error);
        });
      }
    }
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Erro ao reproduzir:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const handleSongEnd = () => {
    changeSong(1);
  };

  const changeSong = (direction) => {
    const newIndex = (currentSongIndex + direction + songs.length) % songs.length;
    setCurrentSongIndex(newIndex);
    setIsPlaying(true);
  };

  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const percentageClicked = clickPosition / progressBarWidth;
    audioRef.current.currentTime = percentageClicked * duration;
  };

  return (
    <div className={`d-flex flex-column min-vh-100 ${styles.musicPlayerPage}`}>
      <Header />
      
      <div className={styles.containerMusicBox}>
        <div className={styles.playerImg}>
          <img 
            src={songs[currentSongIndex].cover} 
            alt="Capa do álbum" 
            className={styles.albumCover}
            onError={(e) => {
              e.target.src = '/assets/logomusicasplayer/default.jpg';
            }}
          />
        </div>
        
        <PlayerInfo 
          title={songs[currentSongIndex].displayName}
          artist={songs[currentSongIndex].artist}
        />
        
        <ProgressBar 
          currentTime={currentTime}
          duration={duration}
          onProgressBarClick={handleProgressBarClick}
        />
        
        <PlayerControls 
          isPlaying={isPlaying}
          onPlayPauseClick={togglePlay}
          onPrevClick={() => changeSong(-1)}
          onNextClick={() => changeSong(1)}
        />
      </div>
      
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnd}
        onLoadedMetadata={handleTimeUpdate}
      />
      
      <Footer />
    </div>
  );
};

export default MusicPlayer;