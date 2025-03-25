"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Icons from "../common/Icon";

const SignupForm = ({
  email,
  setEmail,
  password,
  setPassword,
  fullName,
  setFullName,
  userType,
  setUserType,
  phoneNumber, // New state for phone number
  setPhoneNumber, // New setter for phone number
  loading,
  handleAuth,
  setIsLogin,
  setMessage,
}) => {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
  
    try {
      await handleAuth(e);
    } catch (err) {
      if (err.response?.status === 409 && err.response?.data?.message === "User already exists") {
        setError("An account with this email already exists. Please login instead.");
      } else {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      }

      const errorTimeout = setTimeout(() => {
        setError("");
      }, 3000);
      
      
      return () => clearTimeout(errorTimeout);
    }
  };
  return (
    <>
      <h2 className="text-3xl font-semibold text-center">
        Sign up for <span className="text-blue-600 font-bold">Amilo AI</span>
      </h2>
      <p className="text-center text-gray-500">Join us today!</p>

      <div className={`mb-4 p-8 flex gap-2 items-center max-w-[300px] z-[400] lg:max-w-[500px] w-full bg-black text-red-700 rounded-md fixed top-1/2  duration-300 ${error ? "left-1" : "-left-full"}`}>
       <Icons icon={"errorUser"} />
        {error}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* User Type */}
        <div>
          <label className="block text-sm font-medium">User Type</label>
          <select
            className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            disabled={loading}
          >
            <option value="">Select your type</option>
            <option value="Influencer">Influencer</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Signup Button */}
        <motion.button
          whileHover={{ scale: !loading ? 1.05 : 1 }}
          whileTap={{ scale: !loading ? 0.95 : 1 }}
          type="submit"
          className={`w-full py-3 rounded-lg mt-4 ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Sign up"}
        </motion.button>
      </form>

      {/* Login Link */}
      <p className="text-center text-gray-500 mt-4">
        Already have an account?{" "}
        <button
          onClick={() => {
            setIsLogin(true);
            setMessage("");
          }}
          className="text-blue-600 hover:underline font-semibold"
          disabled={loading}
        >
          Login
        </button>
      </p>
    </>
  );
};

export default SignupForm;
