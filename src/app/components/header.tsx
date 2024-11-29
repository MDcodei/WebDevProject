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
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleContinueAsGuestClick = () => {
    onContinueAsGuest(); // Trigger parent handler to open the location form
    toggleModal(); // Close the Get Started modal
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (isCreatingAccount) {
      const { firstName, lastName, email, password } = formData;
      if (!firstName || !lastName || !email || !password) {
        alert('Please fill in all fields.');
        return;
      }
    } else {
      const { email, password } = formData;
      if (!email || !password) {
        alert('Please fill in all fields.');
        return;
      }
    }

    onSignIn();
    toggleModal(); // Close the modal after signing in
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
                        name="firstName"
                        className="w-full border border-gray-300 p-2 rounded-2xl"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        className="w-full border border-gray-300 p-2 rounded-2xl"
                        value={formData.lastName}
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
