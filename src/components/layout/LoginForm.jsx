"use client";

import { motion } from "framer-motion";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handleAuth,
  setIsLogin,
  setShowForgotPassword,
  setMessage,
  message,
}) => {
  return (
    <>
      <h2 className="text-3xl font-semibold text-center">
        Sign in to <span className="text-blue-600 font-bold">Amilo AI</span>
      </h2>
      <p className="text-center text-gray-500">Welcome back! Please log in.</p>

      <h2 className="text-red-600 font-semibold text-center">{message}</h2>

      <form onSubmit={handleAuth} className="mt-6 space-y-4">
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
          {loading ? "Processing..." : "Sign in"}
        </motion.button>
      </form>

      <p className="text-center text-gray-500 mt-4">
        Don't have an account?{" "}
        <button
          onClick={() => {
            setIsLogin(false);
            setMessage("");
          }}
          className="text-blue-600 hover:underline font-semibold"
          disabled={loading}
        >
          Sign Up
        </button>
        <br />
        Forgot your password?{" "}
        <button
          onClick={() => {
            setShowForgotPassword(true);
            setMessage("");
          }}
          className="text-blue-600 hover:underline font-semibold"
          disabled={loading}
        >
          Reset Password
        </button>
      </p>
    </>
  );
};

export default LoginForm;
