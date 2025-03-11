"use client";

import { motion } from "framer-motion";

const ResetPasswordForm = ({
  newPassword,
  setNewPassword,
  loading,
  handleResetPassword,
  setShowResetPassword,
  setIsLogin,
}) => {
  return (
    <>
      <h2 className="text-3xl font-semibold text-center">Reset Password</h2>
      <p className="text-center text-gray-500">
        Enter your new password below.
      </p>

      <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            placeholder="Enter your new password"
            className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
          {loading ? "Processing..." : "Reset Password"}
        </motion.button>
      </form>

      <p className="text-center text-gray-500 mt-4">
        Remember your password?{" "}
        <button
          onClick={() => {
            setShowResetPassword(false);
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

export default ResetPasswordForm;
