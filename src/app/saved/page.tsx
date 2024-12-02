// "use client";

// import React, { useState } from "react";
// import { useRouter } from 'next/navigation';
// import Footer from '../components/footer';
// import Header from '../components/header';
// import Body from '../components/body_hp';
// import NewHeader from "../components/newheader";
// import NewBody from "../components/newbody_hp";
// import Saved from "../components/Saved";
// import BackArrow from "../components/BackArrow"

// export default function Home() {
//   const [isSignedIn, setIsSignedIn] = useState(true);
//   const [isGuest, setIsGuest] = useState(false);
//   const router = useRouter(); // Initialize the Next.js router

//   const handleLogOut = () => {
//     setIsSignedIn(false);
//     router.push('/');
//   };

//   return (
//     <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFE6"}}>
//       {<NewHeader onLogOut={handleLogOut} />}

//       <BackArrow/>
      
//       {<Saved />}


//       {/* Footer remains constant */}
//       <Footer />
//     </div>
//   );
// }




import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; // Adjust path if necessary
import { redirect } from "next/navigation";
import React from "react";
import Footer from "../components/footer";
import NewHeader from "../components/newheader";
import BackArrow from "../components/BackArrow";
import Saved from "../components/Saved";

// The `SavedPage` will handle the redirect on the server side
export default async function SavedPage() {
  // Check for user session on the server side
  const session = await getServerSession(authOptions);

  // Redirect unauthenticated users to the /main page
  if (!session) {
    redirect("/main"); // Redirect to the main page if the user is not authenticated
  }

  // If session exists, render the saved page
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFE6" }}>
      <NewHeader />
      <BackArrow />
      <Saved />
      <Footer />
    </div>
  );
}

