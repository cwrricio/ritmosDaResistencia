import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayerControls from '../components/music/PlayerControls';
import PlayerInfo from '../components/music/PlayerInfo';
import ProgressBar from '../components/music/ProgressBar';
import styles from '../styles/music/MusicPlayer.module.css';
import { toast } from 'sonner';

const MusicPlayer = () => {
    const initialStaticSongs = [
        {
            idMusica: -1, 
            nomeMusica: 'São Gonça',
            genero: 'MPB',
            arquivo: '/assets/musicasplayer/saogonca.mp3', 
            capa: '/assets/logomusicasplayer/seujorge.jpg', 
            artista: { nomeArtistico: 'Seu Jorge' }, 
        },
        {
            idMusica: -2,
            nomeMusica: 'A Loba',
            genero: 'Samba',
            arquivo: '/assets/musicasplayer/aloba.mp3',
            capa: '/assets/logomusicasplayer/alcione2.png',
            artista: { nomeArtistico: 'Alcione' },
        },
        {
            idMusica: -3,
            nomeMusica: 'Samurai',
            genero: 'MPB',
            arquivo: '/assets/musicasplayer/samurai.mp3',
            capa: '/assets/logomusicasplayer/djavan.png',
            artista: { nomeArtistico: 'Djavan' },
        }
    ];

    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchMusicas = async () => {
            let fetchedSongs = [];
            try {
                const response = await fetch('http://localhost:8080/api/musicas');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                fetchedSongs = await response.json();
            } catch (err) {
                console.error("Erro ao carregar músicas do backend:", err);
                toast.error('Erro ao carregar músicas', { description: err.message });
            } finally {
                setSongs([...initialStaticSongs, ...fetchedSongs]);
            }
        };

        fetchMusicas();
    }, []);

    useEffect(() => {
        if (songs.length > 0 && audioRef.current) {
            const songPath = songs[currentSongIndex].idMusica < 0 ? 
                             songs[currentSongIndex].arquivo : 
                             `http://localhost:8080/${songs[currentSongIndex].arquivo}`; 

            audioRef.current.src = songPath;

            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Erro ao reproduzir:", error);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        } else if (audioRef.current && songs.length === 0) {
            audioRef.current.pause();
        }
    }, [currentSongIndex, isPlaying, songs]);

    const togglePlay = () => {
        if (songs.length === 0) return;
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    const handleSongEnd = () => {
        if (currentSongIndex < songs.length - 1) {
            changeSong(1);
        } else {
            setCurrentSongIndex(0);
            setIsPlaying(false);
        }
    };

    const changeSong = (direction) => {
        if (songs.length === 0) return;
        const newIndex = (currentSongIndex + direction + songs.length) % songs.length;
        setCurrentSongIndex(newIndex);
        setIsPlaying(true);
    };

    const handleProgressBarClick = (e) => {
        if (songs.length === 0 || !audioRef.current || isNaN(duration) || duration === 0) return;

        const progressBar = e.currentTarget;
        const clickPosition = e.nativeEvent.offsetX;
        const progressBarWidth = progressBar.clientWidth;
        const percentageClicked = clickPosition / progressBarWidth;
        audioRef.current.currentTime = percentageClicked * duration;
    };

    if (songs.length === 0 && !audioRef.current?.src) {
        return (
            <div className={`d-flex flex-column min-vh-100 ${styles.musicPlayerPage}`}>
                <Header />
                <div className="flex-grow-1 d-flex justify-content-center align-items-center text-center">
                    <p>Carregando músicas...</p>
                </div>
                <Footer />
            </div>
        );
    }
    if (songs.length === 0) {
        return (
            <div className={`d-flex flex-column min-vh-100 ${styles.musicPlayerPage}`}>
                <Header />
                <div className="flex-grow-1 d-flex justify-content-center align-items-center text-center">
                    <p>Nenhuma música disponível.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={`d-flex flex-column min-vh-100 ${styles.musicPlayerPage}`}>
            <Header />

            <div className={styles.containerMusicBox}>
                <div className={styles.playerImg}>
                    <img src={songs[currentSongIndex].idMusica < 0 ? songs[currentSongIndex].capa : 
                             `http://localhost:8080/${songs[currentSongIndex].capa}`} 
                        alt={`Capa do álbum de ${songs[currentSongIndex].artista ? songs[currentSongIndex].artista.nomeArtistico : 'Artista Desconhecido'}`}
                        className={styles.albumCover}
                        onError={(e) => {
                            e.target.src = '/assets/logomusicasplayer/default.jpg';
                        }}
                    />
                </div>

                <PlayerInfo
                    title={songs[currentSongIndex].nomeMusica} 
                    artist={songs[currentSongIndex].artista ? songs[currentSongIndex].artista.nomeArtistico : 'Artista Desconhecido'} // Usa o nome artístico do artista do DTO
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