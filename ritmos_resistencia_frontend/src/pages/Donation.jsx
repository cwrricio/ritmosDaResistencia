import React from "react";
import { Link } from "react-router-dom";
import DonationHeader from '../components/donation/DonationHeader';
import DonationForm from '../components/donation/DonationForm';
import InfoCard from '../components/donation/InfoCard';
import FeaturedCard from '../components/donation/FeaturedCard';
import NoticeCard from '../components/donation/NoticeCard';
import styles from '../styles/donation/Donation.module.css'; 

const Donation = () => {


  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <DonationHeader /> {/* Componente de Cabeçalho da Página */}

        <div className={styles.mainGrid}>
          <DonationForm /> {/* Componente do Formulário de Doação */}

          {/* Seção de Informações (Cartões Laterais) */}
          <div className={styles.infoSideSection}>
            <InfoCard />      {/* Cartão "Como Sua Doação Ajuda" */}
            <FeaturedCard /> {/* Cartão "Artistas em Destaque" */}
            <NoticeCard />  {/* Cartão "Doação Segura" */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;