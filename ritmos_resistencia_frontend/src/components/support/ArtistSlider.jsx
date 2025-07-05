import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../styles/ArtistSlider.module.css'; // Importa o CSS Module

const ArtistSlider = () => {
    // Tempo de transição entre imagens (em milissegundos)
    const [time] = useState(2000); 
    // Índice da imagem atual, começa em 0
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // LISTA DE IMAGENS COM CAMINHOS AJUSTADOS PARA PUBLIC/ASSETS/IMAGENSAPOIE/
    // *** VERIFIQUE SE SUAS IMAGENS ESTÃO NESSA PASTA EM SEU PROJETO FÍSICO ***
    const images = [
        "/assets/imagensApoie/imagem1.jpg",
        "/assets/imagensApoie/imagem2.jpg",
        "/assets/imagensApoie/imagem3.jpg",
        "/assets/imagensApoie/imagem4.jpg"
    ];

    // Função para avançar para a próxima imagem
    const nextImage = useCallback(() => {
        setCurrentImageIndex((prevIndex) => {
            return (prevIndex + 1) % images.length;
        });
    }, [images.length]); // images.length é uma dependência estável aqui

    // Efeito para iniciar o avanço automático do slider
    useEffect(() => {
        const interval = setInterval(() => {
            nextImage(); 
        }, time);

        // Função de limpeza: importante para parar o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, [time, nextImage]); // time e nextImage são as dependências. 
                           // nextImage é estável graças ao useCallback.

    return (
        <div className={styles.slider}> {/* Aplica a classe .slider do CSS Module */}
            {images.map((img, index) => (
                <img 
                    key={img} /* Key único para cada imagem, importante para React */
                    src={img} /* Caminho da imagem */
                    alt={`Slide ${index + 1} - ${img}`} /* Texto alternativo para acessibilidade e depuração */
                    /* Aplica a classe .selected do CSS Module se a imagem for a atual */
                    className={index === currentImageIndex ? styles.selected : ''} 
                />
            ))}
            {/* Overlay com conteúdo de texto sobre o slider */}
            <div className={styles.overlay}> {/* Aplica a classe .overlay do CSS Module */}
                <div className={styles.content}> {/* Aplica a classe .content do CSS Module */}
                    <h1>QUER APOIAR UM ARTISTA</h1>
                    <p>Inscreva-se e compartilhe sua trajetória</p>
                </div>
            </div>
        </div>
    );
};

export default ArtistSlider;