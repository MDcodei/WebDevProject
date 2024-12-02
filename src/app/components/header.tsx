"use client";

import React, { useState } from 'react';


// Define the type for the props
interface HeaderProps {
  onSignIn: () => void;
  onContinueAsGuest: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignIn, onContinueAsGuest }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const handleContinueAsGuestClick = () => {
    onContinueAsGuest(); 
    toggleModal(); 
  };
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsCreatingAccount(false);
  };

  const handleCreateAccountClick = () => {
    setIsCreatingAccount(true);
  };

  const handleLogInClick = () => {
    setIsCreatingAccount(false);
  };



const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isCreatingAccount) {
    // Handling account creation
    const { firstname, lastname, email, password } = formData;
    if (!firstname || !lastname || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Check if the user already exists
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        alert("User with this email already exists.");
        return;
      }

      // Create the account
      const response = await fetch("/api/createaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Failed to create account");
      }

      const result = await response.json();
      console.log("Account created:", result);
      alert("Account created successfully!");
    } catch (error: any) {
      console.error("Error creating account:", error.message);
      alert(error.message || "An error occurred while creating your account.");
    }
  } else {
    // Handling sign-in
    const { email, password } = formData;
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Invalid email or password.");
      }

      const result = await response.json();
      console.log("Signed in:", result);
      alert("Signed in successfully!");
    } catch (error: any) {
      if (error.message.includes("Incorrect password")) {
        alert("Incorrect password. Please try again.");
      } else if (error.message.includes("User not found")) {
        alert("User not found. Please register first.");
      } else {
        alert(error.message || "An error occurred while signing in.");
      }

      console.error("Error signing in:", error.message);
    }
  }

  // Call onSignIn and toggleModal only if the request was successful
  onSignIn();
  toggleModal();
};



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <header className="flex justify-between items-center p-4" style={{ backgroundColor: "#FFFFE6" }}>
        <div className="logo">
          <img src={"../logo.png"} alt="Logo" className="h-10" />
        </div>
        <div>
          <button
            onClick={toggleModal}
            className="border-2 border-green-800 text-black px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-green-100"
          >
            Get Started
          </button>
        </div>
      </header>

      <hr style={{ borderColor: "#01490C", borderWidth: "0.5px" }} />

      {isModalOpen && (
        <>
          <div
            onClick={toggleModal}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          ></div>
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-lg w-1/3 relative">
              <div className="flex justify-end">
                <button
                  onClick={toggleModal}
                  className="text-green-600 hover:underline hover:text-red-500"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {isCreatingAccount ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstname"
                        className="w-full border border-gray-300 p-2 rounded-2xl"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastname"
                        className="w-full border border-gray-300 p-2 rounded-2xl"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                ) : null}

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 p-2 rounded-2xl"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full border border-gray-300 p-2 rounded-2xl"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4 flex justify-between items-center">
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    {isCreatingAccount ? "Create Account" : "Sign In"}
                  </button>
                </div>
              </form>

              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300 border-t-2" />
                <span className="mx-4 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300 border-t-2" />
              </div>

              {!isCreatingAccount && (
                <button
                  onClick={handleCreateAccountClick}
                  className="w-full text-green-600 border border-green-600 px-4 py-2 rounded hover:bg-green-100"
                >
                  Create an Account
                </button>
              )}

              {isCreatingAccount && (
                <button
                  onClick={handleLogInClick}
                  className="w-full text-green-600 border border-green-600 px-4 py-2 rounded hover:bg-green-100 mt-2"
                >
                  Log In
                </button>
              )}

              <button
                onClick={handleContinueAsGuestClick}
                className="w-full mt-2 text-gray-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
