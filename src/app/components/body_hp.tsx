"use client";

import HomeMaps from '../components/googlemap_hp';
import React from "react";
import Image from 'next/image';  

 
import Image1 from '../images/image1.jpg';  
import Image2 from '../images/image2.jpg';  

 
const circleStyle: React.CSSProperties = {
  border: '4px solid #B91748',  
  borderRadius: '50%',  
  width: '270px',  
  height: '270px',  
  display: 'flex',  
  justifyContent: 'center',  
  alignItems: 'center',  
  overflow: 'hidden',  
  position: 'relative',  
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'flex-end',
  marginTop: 30, 
  marginRight: 80, 
  gap: 20, 
};

const Body: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection:'column' }}>

       <div style={{  paddingTop: ' 10px', textAlign: 'center'}}>
       <p style={{ fontSize: '40px', color:'black' }}>Get started with BiteMap!</p>
       </div>

       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
         <HomeMaps/> 
        <div style={containerStyle}>
          <div style={circleStyle} className="circle1">
            <Image
              src={Image1} 
              alt="Taichi"
              layout="fill" 
              objectFit="cover" 
            />
          </div> 

          <div style={{ ...circleStyle, marginRight: '250px' }} className="circle2"> 
            <Image
              src={Image2} 
              alt="Canes"
              layout="fill" 
              objectFit="cover" 
            />
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Body;
