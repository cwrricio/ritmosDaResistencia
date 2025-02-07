const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play');

const music = new Audio();

const songs = [
    {
        path: '../assets/musicasplayer/saogonca.mp3',
        displayName: 'São Gonça',
        cover: '../assets/logomusicasplayer/seujorge.jpg',
        artist: 'Seu Jorge',
    },
    {
        path: '../assets/musicasplayer/aloba.mp3',
        displayName: 'A Loba',
        cover: '../assets/logomusicasplayer/alcione2.png',
        artist: 'Alcione',
    },
    {
        path:'../assets/musicasplayer/samurai.mp3',
        displayName: 'Samurai',
        cover: '../assets/logomusicasplayer/djavan.png',
        artist: 'Djavan',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    console.log("Carregando música:", song.displayName);
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;

    image.onload = function () {
        console.log("Imagem carregada:", song.cover);
    };

    image.onerror = function () {
        console.error("Erro ao carregar imagem:", song.cover);
        image.src = "../assets/logomusicasplayer/default.jpg"; // Imagem padrão caso ocorra erro
    };

    music.onloadeddata = () => {
        console.log("Música carregada:", song.displayName);
        durationEl.textContent = formatTime(music.duration);
        playMusic(); // 🔥 Agora a música toca assim que é carregada!
    };
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    if (!isNaN(duration)) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
    }
}

function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

// EVENTOS
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

// 🚀 Carregar a primeira música ao iniciar a página e tocá-la automaticamente
document.addEventListener('DOMContentLoaded', () => {
    console.log("Iniciando player...");
    loadMusic(songs[musicIndex]); 
});
