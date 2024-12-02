// "use client";

// import { useRouter } from "next/navigation";

// const Header: React.FC = () => {
//   const router = useRouter();

//   return (
//     <>
//       <header className="flex justify-between items-center p-4" style={{ backgroundColor: "#FFFFE6" }}>
//         <div className="logo">
//           <img src={"../logo.png"} alt="Logo" className="h-10" />
//         </div>
//         <div>
//           <button
//             onClick={() => router.push("/login")}
//             className="border-2 border-green-800 text-black px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-green-100"
//           >
//             Get Started
//           </button>
//         </div>
//       </header>
      
//       {/* Horizontal line */}
//       <hr style={{ borderColor: "#01490C", borderWidth: "0.5px" }} />
//     </>
//   );
// };

// export default Header;







"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // Import signOut for logging out

const Header: React.FC = () => {
  const router = useRouter();

  // For the sake of this example, we'll assume a mock session state for simplicity
  // You can replace this with the actual session check logic if you're handling that client-side
  const isLoggedIn = false;  // Change this based on actual session check (you can use useSession hook)

  const handleLogOut = async () => {
    await signOut({ callbackUrl: '/' }); // Redirect to homepage after sign-out
  };

  return (
    <>
      <header className="flex justify-between items-center p-4" style={{ backgroundColor: "#FFFFE6" }}>
        <div className="logo">
          <img src={"../logo.png"} alt="Logo" className="h-10" />
        </div>

        <div>
          {isLoggedIn ? (
            // For logged-in users, show profile and logout button
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/profile")}  // Redirect to profile page
                className="border-2 border-green-800 text-black px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-green-100"
              >
                Profile
              </button>
              <button
                onClick={handleLogOut}  // Log out when clicked
                className="border-2 border-red-800 text-black px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-red-100"
              >
                Log Out
              </button>
            </div>
          ) : (
            // For guests (not logged-in), show the "Get Started" button
            <button
              onClick={() => router.push("/login")}  // Redirect to login page
              className="border-2 border-green-800 text-black px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-green-100"
            >
              Get Started
            </button>
          )}
        </div>
      </header>

      {/* Horizontal line */}
      <hr style={{ borderColor: "#01490C", borderWidth: "0.5px" }} />
    </>
  );
};

export default Header;
