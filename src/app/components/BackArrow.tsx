"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import backArrow from '../images/backArrow.png';

export default function Home() {
  const router = useRouter(); 

  const handleBackArrow = () => {
    router.push('/main');
  };

  return (
    <div>
      <button type="button" onClick={handleBackArrow} style={{ paddingTop: '20px', paddingLeft: '20px'}}>
        <Image src={backArrow} alt="Back Arrow Image" width={15}/>
      </button>
    </div>
  );
}
