import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from '../../styles/donation/DonationHeader.module.css'; 

const DonationHeader = () => {
  return (
    <div className={styles.headerSection}>
      <Link to="/">
        <button className={styles.backButton}>
          <ArrowLeft className={styles.backButtonIcon} />
          Voltar
        </button>
      </Link>
      <div>
        <h1 className={styles.mainTitle}>Apoie os Artistas</h1>
        <p className={styles.subTitle}>Sua contribuição ajuda a manter a arte viva</p>
      </div>
    </div>
  );
};

export default DonationHeader;