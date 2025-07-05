import React from 'react';
import { Heart } from 'lucide-react'; 

import styles from '../../styles/InfoCard.module.css'; 

const NoticeCard = () => {
  return (
    <div className={styles.securityCard}>
      <div className={styles.securityCardContent}>
        <div className={styles.securityCardHeader}>
          <Heart className={styles.securityCardHeaderIcon} />
          <span className={styles.securityCardHeaderText}>Doação Segura</span>
        </div>
        <p className={styles.securityCardText}>
          Todas as transações são processadas de forma segura. Suas informações pessoais e de pagamento são protegidas.
        </p>
      </div>
    </div>
  );
};

export default NoticeCard;