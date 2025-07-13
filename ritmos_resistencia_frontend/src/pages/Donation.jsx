import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { toast } from "sonner";
import DonationHeader from '../components/donation/DonationHeader';
import DonationForm from '../components/donation/DonationForm';
import InfoCard from '../components/donation/InfoCard';
import FeaturedCard from '../components/donation/FeaturedCard';
import NoticeCard from '../components/donation/NoticeCard';
import styles from '../styles/donation/Donation.module.css';

const Donation = () => {
  const { idArtista } = useParams();
  const [searchParams] = useSearchParams();
  const artistName = searchParams.get('artistName');
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [artistData, setArtistData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (idArtista) {
      const fetchArtistData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/artistas/${idArtista}`);
          if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
          }
          const data = await response.json();
          setArtistData(data);
        }
        catch (error) {
          setFetchError(error.message);
          toast.error('Erro ao carregar dados do artista', { description: error.message });
        } finally {
          setLoadingArtist(false);
        }
      };
      fetchArtistData();
    } else {
      setLoadingArtist(false);
      setFetchError('Nenhum artista selecionado para doação.');
      toast.error('Nenhum artista selecionado', { description: 'Por favor, selecione um artista para doar' });
    }
  }, [idArtista]);
  if (loadingArtist) {
    return (
      <div className={styles.pageContainer}>
        <DonationHeader />
        <div className={styles.contentContainer}><p className="text-center">Carregando detalhes do artista...</p></div>
      </div>
    );
  }
  if (fetchError) {
    return (
      <div className={styles.pageContainer}>
        <DonationHeader />
        <div className={styles.contentContainer}><p className="text-center text-danger">{fetchError}</p></div>
      </div>
    );
  }
  if (!artistData || idArtista < 0) {
    return (
      <div className={styles.pageContainer}>
        <DonationHeader />
        <div className={styles.contentContainer}>
          <p className="text-center">Artista não encontrado ou inválido.</p>
          <p className="text-center"><Link to="/pages/apoie">Voltar</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <DonationHeader />

        <h3 className="text-center text-white mt-4 mb-3">Você está doando para: {artistName || artistData.nomeArtistico}</h3>

        <div className={styles.mainGrid}>
          <DonationForm
            targetArtist={artistData.idArtista}
            targetArtistName={artistData.nomeArtistico}
          />

          <div className={styles.infoSideSection}>
            <InfoCard />
            <FeaturedCard />
            <NoticeCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;