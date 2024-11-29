import React from 'react';
import styles from './RestaurantList.module.css';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
}

interface RestaurantListProps {


  restaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  return (
    <div className={styles.restaurantListContainer}>
      <div className={styles.restaurantList}>
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className={styles.restaurantItem}>
            <img src={restaurant.image} alt={restaurant.name} className={styles.restaurantImage} />
            <div className={styles.restaurantDetails}>
              <h3 className={styles.restaurantName}>{restaurant.name}</h3>
              <p className={styles.restaurantCuisine}>{restaurant.cuisine}</p>
              <div className={styles.restaurantRating}>
                {'★'.repeat(restaurant.rating)}{'☆'.repeat(5 - restaurant.rating)}
              </div>
              
            </div>
            <div className={styles.restaurantButtons}>
                <button className={styles.directionsButton}>Get Directions</button>
                <button className={styles.menuButton}>View Menu</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
