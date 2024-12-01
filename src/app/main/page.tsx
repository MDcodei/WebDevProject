"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Footer from '../components/footer';
import Header from '../components/header';
import Body from '../components/body_hp';
import NewHeader from "../components/newheader";
import NewBody from "../components/newbody_hp";
import Recent from "../components/Recent";
import Saved from "../components/Saved";

export default function Home() {
  //when authentication part is done, this should be changed.
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const router = useRouter(); 


  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleContinueAsGuest = () => {
    setIsGuest(true);
  };

  const handleLogOut = () => {
    setIsSignedIn(false);
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFE6"}}>
      {/* Header remains the same if the user is a guest; changes only when signed in */}
      {isSignedIn ? <NewHeader onLogOut={handleLogOut} /> : <Header onSignIn={handleSignIn} onContinueAsGuest={handleContinueAsGuest} />}
      

      {/* Render NewBody if user is signed in or a guest */}
      {(isSignedIn || isGuest) ? <NewBody /> : <NewBody />}

      {/* Footer remains constant */}
      <Footer />
    </div>
  );
}
