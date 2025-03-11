"use client"; // Mark as a Client Component

import React from "react";
import { useRouter } from "next/navigation";
import {
  FaUserCheck,
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaBook,
  FaUserEdit,
  FaCog,
  FaTools,
} from "react-icons/fa";

// Object data for cards
const settingsData = [
  {
    id: 1,
    icon: <FaUserCheck className="text-4xl text-blue-500 mb-4" />,
    title: "Onboarding",
    description: "Complete your profile to get started.",
    buttonText: "Complete Onboarding",
    path: "/studio-owner/onboarding", // Path for navigation
  },
  {
    id: 2,
    icon: <FaCalendarAlt className="text-4xl text-blue-500 mb-4" />,
    title: "Availability",
    description: "Set your working hours and availability.",
    buttonText: "Update Availability",
    path: "/studio-owner/availability", // Path for navigation
  },
  {
    id: 3,
    icon: <FaMoneyBillAlt className="text-4xl text-blue-500 mb-4" />,
    title: "Earnings",
    description: "View and manage your earnings.",
    buttonText: "View Earnings",
    path: "/studio-owner/earnings", // Path for navigation
  },
  {
    id: 4,
    icon: <FaBook className="text-4xl text-blue-500 mb-4" />,
    title: "Bookings",
    description: "Manage your upcoming and past bookings.",
    buttonText: "View Bookings",
    path: "/studio-owner/bookings", // Path for navigation
  },
  {
    id: 5,
    icon: <FaUserEdit className="text-4xl text-blue-500 mb-4" />,
    title: "Profile",
    description: "Edit your profile information.",
    buttonText: "Edit Profile",
    path: "/studio-owner/profile", // Path for navigation
  },
  {
    id: 6,
    icon: <FaCog className="text-4xl text-blue-500 mb-4" />,
    title: "Preferences",
    description: "Customize your preferences.",
    buttonText: "Update Preferences",
    path: "/studio-owner/preferences", // Path for navigation
  },
  {
    id: 7,
    icon: <FaTools className="text-4xl text-blue-500 mb-4" />,
    title: "Equipment",
    description: "Manage your equipment and tools.",
    buttonText: "Manage Equipment",
    path: "/studio-owner/equipment", // Path for navigation
  },
];

export default function StudioSettingsPage() {
  const router = useRouter();

  // Handle card click
  const handleCardClick = (path) => {
    router.push(path);
  };

  return (
    <div className="p-5 max-w-6xl mx-auto font-sans mt-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Settings Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsData.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item.path)} // Navigate on click
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            {item.icon}
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              {item.title}
            </h2>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              {item.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
