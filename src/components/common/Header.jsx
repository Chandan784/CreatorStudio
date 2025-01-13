"use client";
import { useState } from "react";
import Icons from "./Icon";

const Header = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    city: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your details have been submitted successfully!");
        setFormData({ name: "", mobile: "", city: "" });
      } else {
        alert("Failed to submit details. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (

    <div className="relative bg-[url('https://images.unsplash.com/photo-1598016677484-ad34c3fd766e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3R1ZGlvfGVufDB8fDB8fHww')] bg-cover bg-center py-4">
      <div className="relative mx-auto px-4 max-w-[1200px] xl:px-0 h-full lg:pb-10">
        <div className="flex justify-between items-center mb-6">
          <a href="/" className="text-red-600 font-extrabold text-3xl">Amilo</a>
          <div className="flex space-x-4">
            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 text-gray-800 bg-white">
              
              <Icons icon={"email"}/>
            </a>
            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 text-gray-800 bg-white">
            <Icons icon={"phonecall"}/>
            </a>
          </div>
        </div>
        <form
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto translate-y-40 md:translate-y-20 lg:translate-y-0 lg:translate-x-36"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Become an Amilo
          </h2>

          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
            value={formData.name}
            onChange={handleChange}
          />

          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mobile Number
          </label>
          <div className="flex mb-4">
            <select
              id="country-code"
              className="p-2 border rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="+91">+91</option>
            </select>
            <input
              id="mobile"
              type="text"
              placeholder="Enter your mobile number"
              className="flex-1 p-2 border border-l-0 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="Enter your city"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
            value={formData.city}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            REQUEST A CALL
          </button>

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

  );
};

export default Header;
