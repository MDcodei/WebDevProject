"use client";

import React, { useEffect, useState } from "react";
import styles from "./Saved.module.css";

const Saved: React.FC = () => {
  const [savedPlaces, setSavedPlaces] = useState<
    { name: string; address: string; photo?: string; location: { lat: number; lng: number }; webpage?: string }[]
  >([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedPlaces");
    if (saved) {
      setSavedPlaces(JSON.parse(saved));
    }
  }, []);

  return (
    <div className={styles.saved}>
      {savedPlaces.length > 0 ? (
        <div className={styles.restaurantList}>
          {savedPlaces.map((restaurant, index) => (
            <div key={index} className={styles.restaurantItem}>
              {restaurant.photo ? (
                <img
                  src={restaurant.photo}
                  alt="Restaurant"
                  className={styles.restaurantImage}
                />
              ) : (
                <div className={styles.restaurantImage} style={{ backgroundColor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>
                  No Image
                </div>
              )}
              <div className={styles.restaurantDetails}>
                <strong className={styles.restaurantName}>{restaurant.name}</strong>
                <p className={styles.restaurantAddress}>{restaurant.address}</p>
                
              </div>
              <div className={styles.restaurantButtons}>
                <button
                  className={styles.directionsButton}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${restaurant.location.lat},${restaurant.location.lng}`,
                      "_blank"
                    )
                  }
                >
                  Get Directions
                </button>
                {restaurant.name && (
                  <button
                    className={styles.webpageButton}
                    onClick={() =>
                      window.open(`https://www.google.com/search?q=${encodeURIComponent(restaurant.name)}`, "_blank")
                    }
                  >
                    Search Website
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved restaurants yet.</p>
      )}
    </div>
  );
};

export default Saved;
