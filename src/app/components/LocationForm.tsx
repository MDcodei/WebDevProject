import React, { useState } from 'react';

const LocationForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Close modal handler
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form data here
    console.log("Form submitted");
    setIsModalOpen(false); // Close the modal after form submission
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/3 relative">
            

            {/* Form Content */}
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-4 text-center text-black">
                Enter your current location.
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded-2xl"
                  placeholder="Enter your address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-2xl"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-2xl"
                    placeholder="Enter your state"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Zip Code</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded-2xl"
                  placeholder="Enter your zip code"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  OK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationForm;
