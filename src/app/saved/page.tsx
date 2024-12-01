"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Footer from '../components/footer';
import Header from '../components/header';
import Body from '../components/body_hp';
import NewHeader from "../components/newheader";
import NewBody from "../components/newbody_hp";
import Saved from "../components/Saved";
import BackArrow from "../components/BackArrow"

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const router = useRouter(); // Initialize the Next.js router

  const handleLogOut = () => {
    setIsSignedIn(false);
    router.push('/');
  };

  const sampleRestaurants = [
    {
      id: 1,
      name: 'Clocked',
      cuisine: 'Hamburger',
      rating: 4,
      image: 'https://lh3.googleusercontent.com/p/AF1QipMGw1_I0j_OS-IURfd6mVI4Bg2k6fJCRVYs1PhZ=s1360-w1360-h1020',
    },
    {
      id: 2,
      name: 'Taichi Bubble Tea',
      cuisine: 'Korean',
      rating: 4,
      image: 'https://lh3.googleusercontent.com/p/AF1QipNSBoTnNsbDLioNuzVOoalsya65dqNYHCM_6Nzw=s1360-w1360-h1020',
    },
    {
      id: 3,
      name: 'Chick Fil-A',
      cuisine: 'Chicken Sandwiches',
      rating: 5,
      image: 'https://tb-static.uber.com/prod/image-proc/processed_images/33342b28ddc237e11897199b43e08a83/a19bb09692310dfd41e49a96c424b3a6.jpeg',
    },
   ];
   

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFE6"}}>
      {<NewHeader onLogOut={handleLogOut} />}

      <BackArrow/>
      
      {<Saved restaurants={sampleRestaurants} />}


      {/* Footer remains constant */}
      <Footer />
    </div>
  );
}
