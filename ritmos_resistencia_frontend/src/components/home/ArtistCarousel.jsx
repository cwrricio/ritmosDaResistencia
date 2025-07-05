import React from 'react';
import styles from '../../styles/ArtistCarousel.module.css';

const ArtistCarousel = () => {
  const artists = [
    { id: 1, name: 'Megan The Stallion', image: '../assets/imagens-carousel/meganStalion.jpg' },
    { id: 2, name: 'Frank Ocean', image: '../assets/imagens-carousel/frankOcean.jpg' },
    { id: 3, name: 'Snoop Dog', image: '../assets/imagens-carousel/snoopDog.jpg' },
  ];

  return (
    <div className={`carousel slide carousel-fade mb-5 ${styles.mainCarousel}`} id="artistsCarousel" data-bs-ride="carousel">
      <div className="carousel-inner ">
        
        {artists.map((artist, index) => (
          <div 
            key={artist.id} 
            className={`carousel-item ${index === 0 ? 'active' : ''} ${styles.carouselItemCustom}`}
            data-bs-interval="2000"
          >
            <img src={artist.image} alt={artist.name} className={`d-block w-100 ${styles.carouselImage}`} />
            <div className="carousel-caption">
              <h5>{artist.name}</h5>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#artistsCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#artistsCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ArtistCarousel;