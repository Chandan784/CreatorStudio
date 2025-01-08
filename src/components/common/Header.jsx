"use client";
import React, { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const Header = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div>
        <div className="relative bg-[url('https://prod-disc-disc-part.s3-ap-southeast-1.amazonaws.com/oyo_big_image_MOBILE.jpg')] bg-cover bg-center h-screen p-4">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-red-600 font-extrabold text-3xl">Amilo</h1>
            <div className="flex space-x-4">
              {/* Email Icon */}
              <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 text-gray-800 bg-white">
                <FaEnvelope size={20} />
              </span>

              {/* Phone Icon */}
              <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 text-gray-800 bg-white">
                <FaPhone size={20} />
              </span>
            </div>
          </div>

          {/* Form Section */}
          <div className="absolute top-full left-1/2 lg:top-2/4 lg:left-3/4 transform -translate-x-1/2 -translate-y-1/2">
            <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Become an OYO</h2>

              {/* Name Input */}
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              />

              {/* Mobile Number Input */}
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="flex mb-4">
                {/* Country Code */}
                <select
                  id="country-code"
                  className="p-2 border rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="+91">+91</option>
                  <option value="+20">+20</option>
                  <option value="+1">+1</option>
                </select>

                {/* Mobile Number */}
                <input
                  id="mobile"
                  type="text"
                  placeholder="Enter your mobile number"
                  className="flex-1 p-2 border border-l-0 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* City Input */}
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="Enter your city"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              />

              {/* Hotel/Home Option */}
              <div className="flex justify-start items-center bg-gray-100 p-2 rounded-md mb-6 space-x-4">
                {/* Hotel Option */}
                <label className="flex flex-col items-center space-y-1 cursor-pointer w-32">
                  <input
                    type="radio"
                    name="option"
                    value="hotel"
                    checked={selectedOption === "hotel"}
                    onChange={handleOptionChange}
                    className="hidden"
                  />
                  <div
                    className={`w-full h-16 flex items-center justify-center border-2 ${
                      selectedOption === "hotel"
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-400 bg-white text-green-500"
                    } rounded-md hover:bg-green-500 hover:text-white transition`}
                  >
                    <span className="mr-2">🏨</span> <span>Hotel</span>
                  </div>
                </label>

                {/* Home Option */}
                <label className="flex flex-col items-center space-y-1 cursor-pointer w-32">
                  <input
                    type="radio"
                    name="option"
                    value="home"
                    checked={selectedOption === "home"}
                    onChange={handleOptionChange}
                    className="hidden"
                  />
                  <div
                    className={`w-full h-16 flex items-center justify-center border-2 ${
                      selectedOption === "home"
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-400 bg-white text-blue-500"
                    } rounded-md hover:bg-blue-500 hover:text-white transition`}
                  >
                    <span className="mr-2">🏠</span> <span>Home</span>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                REQUEST A CALL
              </button>

              {/* Privacy Policy */}
              <p className="text-xs text-center text-gray-500 mt-4">
                By sharing your details, you agree to our{" "}
                <a href="#" className="text-blue-500 underline">
                  privacy policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
