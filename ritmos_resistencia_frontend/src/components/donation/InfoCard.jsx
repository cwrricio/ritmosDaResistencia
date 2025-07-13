import React from 'react';
import styles from '../../styles/donation/InfoCard.module.css'; 

const InfoCard = () => {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoCardHeader}>
        <h3 className={styles.infoCardTitle}>Como Sua Doação Ajuda</h3>
      </div>
      <div className={styles.infoCardContent}>
        <div className={styles.infoListSpacing}> 
          <div className={styles.infoListItem}>
            <div className={styles.infoListItemIcon}></div> 
            <div>
              <h4 className={styles.infoListItemTitle}>Equipamentos</h4>
              <p className={styles.infoListItemText}>Som, instrumentos, e outros materiais essenciais</p>
            </div>
          </div>
          <div className={styles.infoListItem}>
            <div className={styles.infoListItemIcon}></div>
            <div>
              <h4 className={styles.infoListItemTitle}>Espaço de Criação</h4>
              <p className={styles.infoListItemText}>Aluguel de estudio e espaços para produção artística</p>
            </div>
          </div>
          <div className={styles.infoListItem}>
            <div className={styles.infoListItemIcon}></div>
            <div>
              <h4 className={styles.infoListItemTitle}>Eventos</h4>
              <p className={styles.infoListItemText}>Organização de mostras e eventos culturais</p>
            </div>
          </div>
          <div className={styles.infoListItem}>
            <div className={styles.infoListItemIcon}></div>
            <div>
              <h4 className={styles.infoListItemTitle}>Educação Artística</h4>
              <p className={styles.infoListItemText}>Workshops e cursos para novos artistas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;