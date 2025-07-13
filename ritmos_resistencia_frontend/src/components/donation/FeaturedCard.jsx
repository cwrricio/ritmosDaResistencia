import React from 'react';
import styles from '../../styles/donation/InfoCard.module.css';

const FeaturedCard = () => {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoCardHeader}>
        <h3 className={styles.infoCardTitle}>Artistas em Destaque</h3>
      </div>
      <div className={styles.infoCardContent}>
        <div className={styles.infoListSpacing}>
          <div className={styles.infoListItem}>
            <div className={styles.featuredArtistAvatarOne}>BK</div> 
            <div>
              <h4 className={styles.infoListItemTitle}>BK - Gigantes</h4>
              <p className={styles.infoListItemText}>Arte urbana e expressão social</p>
            </div>
          </div>
          <div className={styles.infoListItem}>
            <div className={styles.featuredArtistAvatarTwo}>TC</div> 
            <div>
              <h4 className={styles.infoListItemTitle}>Tyler, The Creator - Flower Boy</h4>
              <p className={styles.infoListItemText}>Arte contemporânea e música visual</p>
            </div>
          </div>
          <div className={styles.infoListItem}>
            <div className={styles.featuredArtistAvatarThree}>N</div> 
            <div>
              <h4 className={styles.infoListItemTitle}>Nill - Regina</h4>
              <p className={styles.infoListItemText}>Ilustração e arte digital</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;