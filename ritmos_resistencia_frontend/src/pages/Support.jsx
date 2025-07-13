import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArtistSlider from '../components/support/ArtistSlider';
import styles from '../styles/support/Support.module.css';
import { Link } from 'react-router-dom';

const Support = () => {
  const artists = [
    {
      id: 1,
      name: "Gigantes",
      artist: "BK.",
      image: "../assets/gigantes.png"
    },
    {
      id: 2,
      image: "/assets/flowerboy.jpg",
      name: "Flower Boy",
      artist: "Tyler, The Creator."
    },
    {
      id: 3,
      image: "/assets/regina.jpg",
      name: "Regina",
      artist: "Nill."
    }
  ];

  return (
    <div className={`d-flex flex-column min-vh-100 ${styles.bodyContainer}`}>
      <Header />

      <ArtistSlider />

      <section className={`${styles.creators} container mt-5`}>
        <h2 className={`text-center mb-4 text-white ${styles.sectionTitle}`}>Descubra Artistas</h2>
        <div className="row justify-content-center">
          {artists.map(artist => (
            <div key={artist.id} className="col-md-4 mb-4">
              <div className={`card text-center ${styles.card}`}>
                <img src={artist.image} alt={artist.name} className={styles.cardImage} />
                <div className="card-body">
                  <h5 className="card-title">{artist.name}</h5>
                  <p className="card-text">{artist.artist}</p>
                  <Link to="/doacao" className="btn btn-success">
                    Apoiar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;