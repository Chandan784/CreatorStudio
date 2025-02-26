import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import "../app/globals.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!email || !password || (!isLogin && !fullName)) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login API Call
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/auth/login",
          { email, password }
        );

        localStorage.setItem("token", data.token);
        router.push("/dashboard"); // Redirect after login
      } else {
        // Signup API Call
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/auth/register",
          { name: fullName, email, password }
        );

        setShowVerificationMessage(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side (Form / Message) */}
      <div className="flex flex-col justify-center w-full md:w-3/5 p-12">
        <motion.div
          className="w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Loading Progress Bar */}
          {loading && (
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          )}

          {!showVerificationMessage ? (
            <>
              <h2 className="text-3xl font-semibold text-center">
                {isLogin ? "Sign in to" : "Sign up for"}{" "}
                <span className="text-blue-600 font-bold">Amilo AI</span>
              </h2>
              <p className="text-center text-gray-500">
                {isLogin ? "Welcome back! Please log in." : "Join us today!"}
              </p>

              {error && (
                <p className="text-red-500 text-center mt-3">{error}</p>
              )}
              {message && (
                <p className="text-green-500 text-center mt-3">{message}</p>
              )}

              <form onSubmit={handleAuth} className="mt-6 space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium">
                    Email address
                  </label>
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
                  {loading ? "Processing..." : isLogin ? "Sign in" : "Sign up"}
                </motion.button>
              </form>

              <p className="text-center text-gray-500 mt-4">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setShowVerificationMessage(false);
                    setMessage("");
                  }}
                  className="text-blue-600 hover:underline font-semibold"
                  disabled={loading}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-blue-600">
                Verification Link Sent!
              </h2>
              <p className="text-gray-600 mt-2">
                A verification link has been sent to{" "}
                <span className="font-semibold">{email}</span>. Please check
                your inbox to verify your account.
              </p>
              <button
                onClick={() => {
                  setIsLogin(true);
                  setShowVerificationMessage(false);
                  setMessage("");
                }}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
                disabled={loading}
              >
                Go to Login
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Right Side (Logo & Info) */}
      <div className="hidden md:flex md:w-2/5 items-center justify-center bg-white">
        <div className="text-center">
          <Image
            src="/assets/images/auth/login.svg"
            alt="Amilo AI Logo"
            width={250}
            height={250}
            className="mx-auto"
          />
          <h2 className="text-3xl font-extrabold mt-4 text-gray-800">
            Welcome to Amilo AI
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            AI-powered solutions for smarter real estate decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
