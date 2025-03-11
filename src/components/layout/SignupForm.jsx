"use client";

import { motion } from "framer-motion";

const SignupForm = ({
  email,
  setEmail,
  password,
  setPassword,
  fullName,
  setFullName,
  userType,
  setUserType,
  loading,
  handleAuth,
  setIsLogin,
  setMessage,
}) => {
  return (
    <>
      <h2 className="text-3xl font-semibold text-center">
        Sign up for <span className="text-blue-600 font-bold">Amilo AI</span>
      </h2>
      <p className="text-center text-gray-500">Join us today!</p>

      <form onSubmit={handleAuth} className="mt-6 space-y-4">
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

        <div>
          <label className="block text-sm font-medium">User Type</label>
          <select
            className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            disabled={loading}
          >
            <option value="">Select your type</option>
            <option value="influencer">Influencer</option>
            <option value="business">Business</option>
          </select>
        </div>

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

        <motion.button
          whileHover={{ scale: !loading ? 1.05 : 1 }}
          whileTap={{ scale: !loading ? 0.95 : 1 }}
          type="submit"
          className={`w-full py-3 rounded-lg mt-4 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Sign up"}
        </motion.button>
      </form>

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
