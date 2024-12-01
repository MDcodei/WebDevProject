import React, { useEffect, useState } from "react";
import styles from "./Saved.module.css";

const Saved: React.FC = () => {
  const [savedPlaces, setSavedPlaces] = useState<
    { name: string; address: string; photo?: string; location: { lat: number; lng: number }; rating?: number; review?: string }[]
  >([]);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState<number | null>(null);
  const [reviewInput, setReviewInput] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    const saved = localStorage.getItem("savedPlaces");
    if (saved) {
      setSavedPlaces(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (index: number) => {
    const updatedPlaces = savedPlaces.filter((_, i) => i !== index); // Remove the restaurant by index
    setSavedPlaces(updatedPlaces);
    localStorage.setItem("savedPlaces", JSON.stringify(updatedPlaces)); // Update localStorage
  };

  const handleReviewSubmit = () => {
    if (currentRestaurantIndex !== null) {
      const updatedPlaces = [...savedPlaces];
      updatedPlaces[currentRestaurantIndex].rating = reviewInput.rating;
      updatedPlaces[currentRestaurantIndex].review = reviewInput.comment;
      setSavedPlaces(updatedPlaces);
      localStorage.setItem("savedPlaces", JSON.stringify(updatedPlaces)); // Save updated reviews
      setShowReviewPopup(false);
      setReviewInput({ rating: 0, comment: "" });
    }
  };

  const handleDeleteReview = () => {
    if (currentRestaurantIndex !== null) {
      const updatedPlaces = [...savedPlaces];
      updatedPlaces[currentRestaurantIndex].rating = undefined;
      updatedPlaces[currentRestaurantIndex].review = undefined;
      setSavedPlaces(updatedPlaces);
      localStorage.setItem("savedPlaces", JSON.stringify(updatedPlaces)); // Save updated reviews
      setShowReviewPopup(false);
      setReviewInput({ rating: 0, comment: "" });
    }
  };

  return (
    <div className={styles.saved}>
      {savedPlaces.length > 0 ? (
        <div className={styles.restaurantList}>
          {savedPlaces.map((restaurant, index) => (
            <div key={index} className={styles.restaurantItem}>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(index)} // Delete restaurant
              >
                X
              </button>
              {restaurant.photo ? (
                <img
                  src={restaurant.photo}
                  alt="Restaurant"
                  className={styles.restaurantImage}
                />
              ) : (
                <div
                  className={styles.restaurantImage}
                  style={{
                    backgroundColor: "#ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#555",
                  }}
                >
                  No Image
                </div>
              )}
              <div className={styles.restaurantDetails}>
                <strong className={styles.restaurantName}>
                  {restaurant.name}{" "}
                  {restaurant.rating ? (
                    <span>({restaurant.rating}/5)</span>
                  ) : (
                    ""
                  )}
                </strong>
                <p className={styles.restaurantAddress}>{restaurant.address}</p>
                {restaurant.review && (
                  <p className={styles.restaurantReview}>
                    <strong>Review:</strong> {restaurant.review}
                  </p>
                )}
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
                      window.open(
                        `https://www.google.com/search?q=${encodeURIComponent(restaurant.name)}`,
                        "_blank"
                      )
                    }
                  >
                    Search Website
                  </button>
                )}
                <button
                  className={styles.reviewButton}
                  onClick={() => {
                    setCurrentRestaurantIndex(index);
                    setReviewInput({
                      rating: restaurant.rating || 0,
                      comment: restaurant.review || "",
                    });
                    setShowReviewPopup(true);
                  }}
                >
                  {restaurant.review ? "Edit Review" : "Leave a Review"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved restaurants yet.</p>
      )}

      {showReviewPopup && currentRestaurantIndex !== null && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{savedPlaces[currentRestaurantIndex]?.review ? "Edit Your Review" : "Leave a Review"}</h3>
          <input
            type="number"
            value={reviewInput.rating}
            onChange={(e) => setReviewInput({ ...reviewInput, rating: Number(e.target.value) })}
            min={1}
            max={5}
            placeholder="Rating (1-5)"
            style={{
              marginBottom: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%",
            }}
          />
          <textarea
            value={reviewInput.comment}
            onChange={(e) => setReviewInput({ ...reviewInput, comment: e.target.value })}
            placeholder="Write your review here..."
            rows={4}
            style={{
              marginBottom: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleReviewSubmit}
              style={{
                padding: "8px 12px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
            <button
              onClick={() => setShowReviewPopup(false)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteReview}
              style={{
                padding: "8px 12px",
                backgroundColor: "#ffc107",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete Review
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Saved;
