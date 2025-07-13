import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArtistSlider from '../components/support/ArtistSlider';
import styles from '../styles/support/Support.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Support = () => {
  const navigate = useNavigate();

  const initialFeaturedMusics = [
    { idMusica: -1, nomeMusica: "Gigantes", genero: "Rap", arquivo: "", capa: "/assets/gigantes.png", artista: { nomeArtistico: "BK." } },
    { idMusica: -2, nomeMusica: "Flower Boy", genero: "Hip Hop", arquivo: "", capa: "/assets/flowerboy.jpg", artista: { nomeArtistico: "Tyler, The Creator." } },
    { idMusica: -3, nomeMusica: "Regina", genero: "Rap", arquivo: "", capa: "/assets/regina.jpg", artista: { nomeArtistico: "Nill." } }
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    const fetchMusicas = async () => {
      let fetchedMusics = [];
      try {
        const response = await fetch('http://localhost:8080/api/musicas');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        fetchedMusics = await response.json();
      } catch (err) {
        setError(err.message);
        toast.error('Erro ao carregar músicas para a página de apoio', { description: err.message });
      } finally {
        setMusics([...initialFeaturedMusics, ...fetchedMusics]);
        setLoading(false);
      }
    };

    fetchMusicas();
  }, []);

  const handleApoiarClick = (artistId, artistName) => {
    if (isLoggedIn) {
      navigate(`/doacao/${artistId}?artistName=${encodeURIComponent(artistName)}`);
    } else {
      toast.info('Você precisa estar logado para fazer uma doação.', { duration: 3000 });
      navigate('/pages/login');
    }
  };

  if (loading) {
    return (
      <div className={`d-flex flex-column min-vh-100 ${styles.bodyContainer}`}>
        <Header />
        <section className={`${styles.creatorsSection} container mt-5`}>
          <p className="text-center text-white">Carregando artistas e músicas...</p>
        </section>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`d-flex flex-column min-vh-100 ${styles.bodyContainer}`}>
        <Header />
        <section className={`${styles.creatorsSection} container mt-5`}>
          <p className="text-center text-danger">Erro: {error}</p>
        </section>
        <Footer />
      </div>
    );
  }

  if (musics.length === 0) {
    return (
      <div className={`d-flex flex-column min-vh-100 ${styles.bodyContainer}`}>
        <Header />
        <section className={`${styles.creatorsSection} container mt-5`}>
          <p className="text-center text-white">Nenhuma música ou artista disponível para exibição.</p>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`d-flex flex-column min-vh-100 ${styles.bodyContainer}`}>
      <Header />

      <ArtistSlider />

      <section className={`${styles.creatorsSection} container mt-5`}>
        <h2 className={`text-center mb-4 text-white ${styles.sectionTitle}`}>Descubra Artistas e Músicas</h2>
        <div className="row justify-content-center">
          {musics.map(music => (
            <div key={music.idMusica} className="col-md-4 mb-4">
              <div className={`card text-center ${styles.card}`}>
                <img
                  src={music.idMusica < 0 ? music.capa : `http://localhost:8080/${music.capa}`}
                  alt={`Capa de ${music.nomeMusica}`}
                  className={styles.cardImage}
                  onError={(e) => { e.target.src = '/assets/logomusicasplayer/default.jpg'; }}
                />
                <div className="card-body">
                  <h5 className="card-title">{music.nomeMusica}</h5>
                  <p className="card-text">{music.artista ? music.artista.nomeArtistico : 'Artista Desconhecido'}</p>

                  <button
                    onClick={() => handleApoiarClick(music.artista.idArtista, music.artista.nomeArtistico)}
                    className="btn btn-success"
                    style={{ cursor: 'pointer' }}
                  >
                    Apoiar
                  </button>
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