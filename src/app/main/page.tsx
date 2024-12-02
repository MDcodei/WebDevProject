// "use client";

// import React, { useState } from "react";
// import { useRouter } from 'next/navigation';
// import Footer from '../components/footer';
// import Header from '../components/header';
// import Body from '../components/body_hp';
// import NewHeader from "../components/newheader";
// import NewBody from "../components/newbody_hp";
// import Saved from "../components/Saved";

// export default function Home() {
//   //when authentication part is done, this should be changed.
//   const [isSignedIn, setIsSignedIn] = useState(true);
//   const [isGuest, setIsGuest] = useState(false);
//   const router = useRouter(); 


//   const handleSignIn = () => {
//     setIsSignedIn(true);
//   };

//   const handleContinueAsGuest = () => {
//     setIsGuest(true);
//   };

//   const handleLogOut = () => {
//     setIsSignedIn(false);
//     router.push('/');
//   };

//   return (
//     <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFE6"}}>
//       {/* Header remains the same if the user is a guest; changes only when signed in */}
//       {isSignedIn ? <NewHeader onLogOut={handleLogOut} /> : <Header onSignIn={handleSignIn} onContinueAsGuest={handleContinueAsGuest} />}
      

//       {/* Render NewBody if user is signed in or a guest */}
//       {(isSignedIn || isGuest) ? <NewBody /> : <NewBody />}

//       {/* Footer remains constant */}
//       <Footer />
//     </div>
//   );
// }





// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
// import Footer from "../components/footer";
// import NewHeader from "../components/newheader";
// import NewBody from "../components/newbody_hp";
// import Header from '../components/header';


// export default async function MainPage() {
//   // Check if a session exists
//   const session = await getServerSession(authOptions);

//   // Redirect unauthenticated users to the login page
//   if (!session) {
//     redirect("/"); // Redirect to the homepage or login page
//   }

//   // If session exists, render the main page
//   return (
//     <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFE6" }}>
//       {/* Display header for signed-in users */}
//       <NewHeader onLogOut={() => redirect("/")} />
      
//       {/* Main page content */}
//       <NewBody />

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }






// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
// import Footer from "../components/footer";
// import NewHeader from "../components/newheader";
// import NewBody from "../components/newbody_hp";
// import Header from '../components/header';

// export default async function MainPage() {
//   // Check if a session exists
//   const session = await getServerSession(authOptions);

//   // Redirect unauthenticated users to the login page
//   if (!session) {
//     //redirect("/"); // Redirect to the homepage or login page
//   }

//   // If session exists, render the main page
//   return (
//     <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFE6" }}>
//       {/* Conditionally render the header based on session */}
//       {session ? (
//         <NewHeader />
//       ) : (
//         <Header onSignIn={() => redirect("/signup")} onContinueAsGuest={() => redirect("/main")} />
//       )}
      
//       {/* Main page content */}
//       <NewBody />

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }




import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Footer from "../components/footer";
import NewHeader from "../components/newheader";
import NewBody from "../components/newbody_hp";
import Header from '../components/header';

export default async function MainPage() {
  // Check if a session exists
  const session = await getServerSession(authOptions);

  // If no session exists, show the standard header and allow guest users to proceed
  if (!session) {
    return (
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFE6" }}>
        <Header /> {/* Show basic Header for guest/unauthenticated users */}
        <NewBody /> {/* Main content */}
        <Footer />
      </div>
    );
  }

  // If session exists, show the new header for logged-in users
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#FFFFE6" }}>
      <NewHeader /> {/* Show the NewHeader for logged-in users */}
      <NewBody /> {/* Main content */}
      <Footer />
    </div>
  );
}
