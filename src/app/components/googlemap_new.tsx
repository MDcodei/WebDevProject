"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface HomeMapsNewProps {
  searchedPlace: string;
}

const libraries: ("places" | "geometry" | "drawing")[] = ["places"];

const HomeMapsNew: React.FC<HomeMapsNewProps> = ({ searchedPlace }) => {
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 33.749,
    lng: -84.388,
  });
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [restaurants, setRestaurants] = useState<
    { id: string; name: string; address: string; photo?: string; location: { lat: number; lng: number } }[]
  >([]);
  const [savedPlaces, setSavedPlaces] = useState<
    { id: string; name: string; address: string; photo?: string; location: { lat: number; lng: number } }[]
  >([]);

  // Load saved places from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedPlaces");
    if (saved) {
      setSavedPlaces(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const geocodePlace = async () => {
      if (searchedPlace && typeof google !== "undefined") {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: searchedPlace }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const location = results[0].geometry.location;
            setMapCenter({ lat: location.lat(), lng: location.lng() });
            setMarkerPosition({ lat: location.lat(), lng: location.lng() });
          } else {
            console.error("Geocoding failed:", status);
          }
        });
      }
    };
    geocodePlace();
  }, [searchedPlace]);

  const fetchRestaurants = async (lat: number, lng: number) => {
    if (typeof google !== "undefined") {
      const map = new google.maps.Map(document.createElement("div"));
      const service = new google.maps.places.PlacesService(map);
      const request = {
        location: new google.maps.LatLng(lat, lng),
        radius: 5000,
        type: "restaurant",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const restaurantList = results.slice(0, 5).map((place) => ({
            id: place.place_id || `unknown-${Math.random()}`,
            name: place.name || "Unknown Name",
            address: place.vicinity || "Unknown Address",
            photo: place.photos
              ? place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })
              : undefined,
            location: {
              lat: place.geometry?.location?.lat() ?? 0,
              lng: place.geometry?.location?.lng() || 0,
            },
          }));
          setRestaurants(restaurantList);
        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          setRestaurants([]);
        } else {
          console.error("Places API Error:", status, results);
        }
      });
    } else {
      console.error("Google Maps is not available.");
    }
  };

  useEffect(() => {
    if (mapCenter.lat && mapCenter.lng) {
      fetchRestaurants(mapCenter.lat, mapCenter.lng);
    }
  }, [mapCenter]);

  const handleSave = (restaurant: {
    id: string;
    name: string;
    address: string;
    photo?: string;
    location: { lat: number; lng: number };
  }) => {
    setSavedPlaces((prev) => {
      const exists = prev.some((place) => place.id === restaurant.id);
      const updatedPlaces = exists
        ? prev.filter((place) => place.id !== restaurant.id) // Remove if exists
        : [...prev, restaurant]; // Add if not exists
      localStorage.setItem("savedPlaces", JSON.stringify(updatedPlaces)); // Persist in localStorage
      return updatedPlaces;
    });
  };

  const navigateToSaved = () => {
    const router = useRouter();
    router.push("/saved");
  };

  const containerStyle = {
    width: "60%",
    height: "550px",
    marginLeft: "20px",
    display: "block",
  };

  const listStyle = {
    width: "35%",
    marginRight: "20px",
    padding: "20px",
    backgroundColor: "#E2EDA8",
    borderLeft: "1px solid #ccc",
    height: "550px",
    overflowY: "auto" as "visible" | "hidden" | "scroll" | "auto",
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <LoadScript googleMapsApiKey="AIzaSyBip4g_PnevZ9apyfj2jzv8Ff9WpVwXThs" libraries={libraries}>
        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={12}>
          {markerPosition && (
            <Marker
              position={markerPosition}
              title="Your Location"
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={restaurant.location}
              title={restaurant.name}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <div style={listStyle}>
        <h3>Nearby Restaurants</h3>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {restaurant.photo ? (
                  <img
                    src={restaurant.photo}
                    alt="Restaurant"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "15px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#ccc",
                      marginRight: "15px",
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <strong>{restaurant.name}</strong>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                    {restaurant.address}
                  </p>
                </div>
                <button
                  onClick={() => handleSave(restaurant)}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: savedPlaces.some((place) => place.id === restaurant.id)
                      ? "#7ADA5C"
                      : "#ccc",
                  }}
                >
                  {savedPlaces.some((place) => place.id === restaurant.id) ? (
                    <FaBookmark />
                  ) : (
                    <FaRegBookmark />
                  )}
                </button>
              </div>
              <button
                onClick={() => {
                  if (!markerPosition) {
                    alert("Unable to determine your current location.");
                    return;
                  }
              
                  
                  const originLat = markerPosition.lat;
                  const originLng = markerPosition.lng;
              
                  
                  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${restaurant.location.lat},${restaurant.location.lng}`;
              
                  
                  window.open(googleMapsUrl, "_blank");
                }}
                style={{
                  marginTop: "10px",
                  padding: "8px 10px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Get Directions
              </button>
            </div>
          ))
        ) : (
          <p>No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default HomeMapsNew;


