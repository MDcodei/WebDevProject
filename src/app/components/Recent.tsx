import React from 'react';
import recentIcon from '../images/recentIcon.png';
import RestaurantList from './RestaurantList';
import styles from './Saved.module.css';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
}

interface RecentProps {
  restaurants: Restaurant[];
}

const Recent: React.FC<RecentProps> = ({ restaurants }) => {
    return (
      <div className={styles.savedContainer}>
        <div className={styles.savedTitle}>
          <img src={recentIcon.src} alt="Recent Icon" className={styles.iconImage} />
          <span className={styles.savedText}>Recent</span>
        </div>
        <RestaurantList 
         
          restaurants={restaurants} 
        />
      </div>
    );
  };

export default Recent;
