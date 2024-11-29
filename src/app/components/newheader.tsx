"use client";
import profileUserImage from '../images/profile-user.png';
import Image from 'next/image';  
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 

interface NewHeaderProps {
  onLogOut: () => void;
}

const NewHeader: React.FC<NewHeaderProps> = ({ onLogOut }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter(); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSavedClick = () => {
    router.push('/saved');
  };

  /*const handleRecentClick = () => {
    router.push('/recent');
  };*/

  return (
    <div>
      <header className="flex justify-between items-center p-4" style={{ backgroundColor: "#FFFFE6" }}>
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>

        {/* User Profile */}
        <div className="relative">
          <div 
            onClick={toggleDropdown} 
            className="cursor-pointer flex items-center space-x-2"
          >
            <Image 
              src={profileUserImage} 
              alt="User Profile" 
              className="w-9 h-9 rounded-full border-2 border-green-600" 
            />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 bg-green-100 border border-green-500 rounded shadow-lg z-10"
              style={{ width: '90px' }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dropdown
            >
              
              
              <div 
                className="p-2 hover:bg-green-200 cursor-pointer text-black text-center"
                onClick={handleSavedClick} 
              >
                Saved
              </div>
              <div 
                className="p-2 hover:bg-green-200 cursor-pointer text-red-600 text-center"
                onClick={onLogOut}
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      </header>
      
      <hr style={{ borderColor: "#01490C", borderWidth: "0.5px" }} />
    </div>
  );
};

export default NewHeader;
