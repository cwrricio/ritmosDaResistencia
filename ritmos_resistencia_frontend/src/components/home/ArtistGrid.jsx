import React from 'react';
import styles from '../../styles/home/ArtistGrid.module.css'; 

const ArtistGrid = () => {
  const artists = [
    { id: 1, name: 'Djavan', image: '../assets/imagens-grade/djavan.png', class: '' },
    { id: 2, name: 'Seu Jorge', image: '../assets/imagens-grade/seuJorge.png', class: '' },
    { id: 3, name: 'Ludmila', image: '../assets/imagens-grade/ludmila.PNG', class: 'ludmila-pos' },
    { id: 4, name: 'Alcione', image: '../assets/imagens-grade/alcione.jpg', class: 'alcione-pos' },
    { id: 5, name: 'Pericles', image: '../assets/imagens-grade/pericles.jpg', class: 'pericles-pos' },
    { id: 6, name: 'Milton Nascimento', image: '../assets/imagens-grade/miltonNascimento.jpg', class: '' },
  ];

  const getPositionClass = (posClass) => {
    switch (posClass) {
      case 'ludmila-pos':
        return styles.ludmilaPos;
      case 'alcione-pos':
        return styles.alcionePos;
      case 'pericles-pos':
        return styles.periclesPos;
      default:
        return '';
    }
  };

  return (
    // Aplica a classe .gradeArtistas à seção
    <section className={styles.gradeArtistas}>
      <div className={`container-fluid ${styles.gradeArtistasContainer || ''}`}>
        <div className="row g-4">
          {artists.map(artist => (
            <div
              key={artist.id}
              className={`
                col-xl-${artist.id === 3 || artist.id === 4 ? '6' : '3'}
                col-lg-${artist.id === 3 || artist.id === 4 ? '12' : '6'}
                col-md-${artist.id === 3 || artist.id === 4 ? '6' : '3'}
                col-sm-${artist.id === 3 || artist.id === 4 ? '12' : '6'}
                ${styles.cardArtista} {/* Aplica a classe .cardArtista */}
                ${getPositionClass(artist.class)} {/* Aplica a classe de posicionamento específica */}
              `}
            >
              {/* Se o seu .artista-container tem estilos, crie uma classe .artistaContainer no CSS Module */}
              <div className={styles.artistaContainer || ''}>
                {/* Aplica a classe .cardArtistaImg à imagem */}
                <img src={artist.image} alt={artist.name} className={styles.cardArtistaImg} />
                <div className={styles.artistaOverlay}>
                  {/* Aplica a classe .artistaNome ao nome */}
                  <span className={styles.artistaNome}>{artist.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistGrid;