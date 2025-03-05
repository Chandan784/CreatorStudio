"use client";
import { useState, useEffect } from "react";
import { Phone, LayoutDashboard } from "lucide-react"; // Replace Settings with LayoutDashboard
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate login state
  const [user, setUser] = useState(null); // State to store user data
  const [userRole, setUserRole] = useState(""); // State to store user role
  const router = useRouter();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      // Simulate fetching user data (replace with your actual logic)
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUser(userData);
        setUserRole(userData.role); // Extract role from user object
        setIsLoggedIn(true); // Set login state to true
      }
    };

    fetchUser();
  }, []);

  // Handle dashboard button click
  const handleDashboardClick = () => {
    switch (userRole) {
      case "studioOwner":
        router.push("/studio-owner/dashboard");
        break;
      case "user":
        router.push("/dashboard");
        break;
      case "admin":
        router.push("/admin/dashboard");
        break;
      default:
        router.push("/"); // Fallback to home page
        break;
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => router.push("/")}
        >
          MyStudio
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Onboard Button (Blinking Animation) */}
          <a
            href="/studioOnboard"
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md animate-blink"
          >
            🚀 Onboard Your Studio for Free
          </a>

          {/* Call Now Button (No Background) */}
          <a
            href="tel:+6370302039"
            className="flex items-center text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            📞 Call Now: +91 63703 02039
          </a>

          {/* Login Button or Dashboard Icon */}
          {!isLoggedIn ? (
            <a
              href="/auth"
              className="px-6 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition"
            >
              Login
            </a>
          ) : (
            <LayoutDashboard
              className="w-6 h-6 text-indigo-600 cursor-pointer hover:text-indigo-700"
              onClick={handleDashboardClick}
            />
          )}
        </div>

        {/* Mobile Menu (Always Visible) */}
        <div className="md:hidden flex items-center gap-4">
          {/* Call Now Button */}
          <a
            href="tel:+6370302039"
            className="flex items-center text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            📞 Call Now
          </a>

          {/* Login Button or Dashboard Icon */}
          {!isLoggedIn ? (
            <a
              href="/auth"
              className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition"
            >
              Login
            </a>
          ) : (
            <LayoutDashboard
              className="w-6 h-6 text-indigo-600 cursor-pointer hover:text-indigo-700"
              onClick={handleDashboardClick}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
