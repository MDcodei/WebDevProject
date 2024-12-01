"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // Use Next.js router
import Footer from './components/footer';
import Header from './components/header';
import Body from './components/body_hp';
import NewHeader from "./components/newheader";
import NewBody from "./components/newbody_hp";
import Recent from "./components/Recent";
import Saved from "./components/Saved";

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const router = useRouter(); // Initialize the Next.js router

  const handleSignIn = () => {
    setIsSignedIn(true);
    router.push('/main'); // Redirect to /main after signing in
  };

  const handleContinueAsGuest = () => {
    setIsGuest(true);
    //router.push('/main'); // Redirect to /main for guests  //not yet impletemented because authentication isn't implemented yet //use useContext for authentication.
  };

  const handleLogOut = () => {
    setIsSignedIn(false);
    router.push('/'); // Redirect to home page on logout
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFE6"}}>
      {/* Header remains the same if the user is a guest; changes only when signed in */}
      {isSignedIn ? <NewHeader onLogOut={handleLogOut} /> : <Header onSignIn={handleSignIn} onContinueAsGuest={handleContinueAsGuest} />}
      
      {/* Render NewBody if user is signed in or a guest */}
      {(isSignedIn || isGuest) ? <NewBody /> : <Body />}
      {/* Footer remains constant */}
      <Footer />
    </div>
  );
}
