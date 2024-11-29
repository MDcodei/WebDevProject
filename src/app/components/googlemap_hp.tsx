"use client";

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%', 
  height: '520px' // Adjust the height as needed
};

const getRandomLandCoordinates = () => {
  const latRange = [25, 49];     // Latitude range for North America
  const lngRange = [-125, -66];  // Longitude range for North America

  return {
    lat: Math.random() * (latRange[1] - latRange[0]) + latRange[0],
    lng: Math.random() * (lngRange[1] - lngRange[0]) + lngRange[0]
  };
};


const HomeMaps = () => {
  const [center, setCenter] = useState(getRandomLandCoordinates());

  // Optional: Update center coordinates every time the component mounts
  useEffect(() => {
    setCenter(getRandomLandCoordinates());
  }, []);

  return (
    <div 
      className="w-1/3 p-4" 
      style={{
        width: '700px',
        border: '4px solid #B91748',
        marginLeft: '60px',
        marginRight: 'auto',
        marginTop: '30px',
      }} 
    >
      <LoadScript googleMapsApiKey="AIzaSyBip4g_PnevZ9apyfj2jzv8Ff9WpVwXThs">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={() => console.log("Map loaded successfully")} // Log map load status
        >
          {/* Add any markers or other features here */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default HomeMaps;
