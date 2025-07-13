import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../styles/support/ArtistSlider.module.css'; 

const ArtistSlider = () => {
    const [time] = useState(2000); 
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        "/assets/imagensApoie/imagem1.jpg",
        "/assets/imagensApoie/imagem2.jpg",
        "/assets/imagensApoie/imagem3.jpg",
        "/assets/imagensApoie/imagem4.jpg"
    ];

    const nextImage = useCallback(() => {
        setCurrentImageIndex((prevIndex) => {
            return (prevIndex + 1) % images.length;
        });
    }, [images.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage(); 
        }, time);

        return () => clearInterval(interval);
    }, [time, nextImage]); 

    return (
        <div className={styles.slider}> 
            {images.map((img, index) => (
                <img 
                    key={img} 
                    src={img} 
                    alt={`Slide ${index + 1} - ${img}`} 
                    className={index === currentImageIndex ? styles.selected : ''} 
                />
            ))}
            <div className={styles.overlay}> 
                <div className={styles.content}> 
                    <h1>QUER APOIAR UM ARTISTA</h1>
                    <p>Inscreva-se e compartilhe sua trajetória</p>
                </div>
            </div>
        </div>
    );
};

export default ArtistSlider;