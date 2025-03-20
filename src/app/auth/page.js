"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { login } from "@/store/slice/authSlice";
import { decodeToken } from "@/utils/decodeToken";
import LoginForm from "@/components/layout/LoginForm";
import SignupForm from "@/components/layout/SignupForm";
import ForgotPasswordForm from "@/components/layout/ForgotPasswordForm";
import VerificationMessage from "@/components/layout/VerificationMessage";
import ResetPasswordForm from "@/components/layout/ResetPasswordForm";

export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!password || (!isLogin && (!fullName || !userType || !phoneNumber))) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/auth/login",
          { email, password }
        );
        console.log(data, "Result");
        setMessage(data.message)
        dispatch(login(data.token));

        const userRole = decodeToken(data.token).role;

        if (userRole === "studioOwner") {
          router.push("/studio-owner/dashboard");
        } else if (userRole === "influencer") {
          router.push("/creator/dashboard");
        } else if (userRole === "business") {
          router.push("/creator");
        } else if (userRole === "agency") {
          router.push("/dashboard");
        } else {
          router.push("/creator");
        }
      } else {
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/auth/register",
          {
            name: fullName,
            email,
            password,
            role: userType,
            phoneNumber,
          } // Include phoneNumber in the request
        );

        setShowVerificationMessage(true);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/forgot-password",
        { email }
      );

      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/auth/reset-password",
        { token: resetToken, newPassword }
      );

      setMessage(data.message);
      setShowResetPassword(false);
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
          {loading && (
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          )}

          {showResetPassword ? (
            <ResetPasswordForm
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              loading={loading}
              handleResetPassword={handleResetPassword}
              setShowResetPassword={setShowResetPassword}
              setIsLogin={setIsLogin}
            />
          ) : showForgotPassword ? (
            <ForgotPasswordForm
              email={email}
              setEmail={setEmail}
              loading={loading}
              handleForgotPassword={handleForgotPassword}
              setShowForgotPassword={setShowForgotPassword}
              setIsLogin={setIsLogin}
            />
          ) : !showVerificationMessage ? (
            isLogin ? (
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                handleAuth={handleAuth}
                setIsLogin={setIsLogin}
                setShowForgotPassword={setShowForgotPassword}
                setMessage={setMessage}
                message = {message}
              />
            ) : (
              <SignupForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                fullName={fullName}
                setFullName={setFullName}
                userType={userType}
                setUserType={setUserType}
                phoneNumber={phoneNumber} // Pass phone number state
                setPhoneNumber={setPhoneNumber} // Pass phone number setter
                loading={loading}
                handleAuth={handleAuth}
                setIsLogin={setIsLogin}
                setMessage={setMessage}
                message= {message}
              />
            )
          ) : (
            <VerificationMessage
              email={email}
              loading={loading}
              setIsLogin={setIsLogin}
              setShowVerificationMessage={setShowVerificationMessage}
            />
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
