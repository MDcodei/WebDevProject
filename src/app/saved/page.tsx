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

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFE6"}}>
      {<NewHeader onLogOut={handleLogOut} />}

      <BackArrow/>
      
      {<Saved />}


      {/* Footer remains constant */}
      <Footer />
    </div>
  );
}
