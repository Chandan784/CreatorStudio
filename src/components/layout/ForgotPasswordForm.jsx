"use client";

import { motion } from "framer-motion";

const ForgotPasswordForm = ({
  email,
  setEmail,
  loading,
  handleForgotPassword,
  setShowForgotPassword,
  setIsLogin,
  message,
}) => {
  return (
    <>
      <h2 className="text-3xl font-semibold text-center">Forgot Password</h2>
      <p className="text-center text-gray-500">
        Enter your email to reset your password.
      </p>
      <h3 className="text-red-700 font-semibold text-center text-sm">{message}</h3>

      <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
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
          {loading ? "Processing..." : "Send Reset Link"}
        </motion.button>
      </form>

      <p className="text-center text-gray-500 mt-4">
        Remember your password?{" "}
        <button
          onClick={() => {
            setShowForgotPassword(false);
            setIsLogin(true);
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

export default ForgotPasswordForm;
