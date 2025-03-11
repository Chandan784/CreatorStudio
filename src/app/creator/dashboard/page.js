"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

const CreatorDashboardPage = () => {
  const router = useRouter();

  // Mock user data (Replace with real data from API or state management)
  const user = {
    name: "John Doe",
    stats: {
      engagementRate: "75%",
      totalVideos: 120,
      totalScripts: 45,
    },
    notifications: [
      {
        id: 1,
        message: "New feature update available!",
        date: "March 5, 2025",
      },
      {
        id: 2,
        message: "Your script has been approved!",
        date: "March 4, 2025",
      },
      {
        id: 3,
        message: "Weekly engagement report ready.",
        date: "March 3, 2025",
      },
    ],
  };

  return (
    <div className=" bg-gray-100 min-h-screen">
      {/* Main Content */}
      <div className=" w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
        <p className="text-gray-600 mb-4">
          Keep up the great work! Your engagement rate is at
          <span className="text-purple-600 font-bold">
            {" "}
            {user.stats.engagementRate}
          </span>
          .
        </p>

        {/* Call to Action Button */}
        <motion.button
          className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/recharge")}
        >
          Increase My Reach
        </motion.button>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-4 shadow rounded-lg text-center">
            <p className="text-xl font-bold text-purple-600">
              {user.stats.totalVideos}
            </p>
            <p className="text-gray-500">Total Videos</p>
          </div>
          <div className="bg-gray-50 p-4 shadow rounded-lg text-center">
            <p className="text-xl font-bold text-purple-600">
              {user.stats.totalScripts}
            </p>
            <p className="text-gray-500">Total Scripts</p>
          </div>
          <div className="bg-gray-50 p-4 shadow rounded-lg text-center">
            <p className="text-xl font-bold text-purple-600">
              {user.stats.engagementRate}
            </p>
            <p className="text-gray-500">Engagement Rate</p>
          </div>
        </div>

        {/* Tracker Button */}
        <motion.button
          className="mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/tracker")}
        >
          View Tracker
        </motion.button>

        {/* Notifications */}
        <div className="mt-6 bg-gray-50 p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <ul className="mt-2 space-y-2">
            {user.notifications.map((notification) => (
              <li key={notification.id} className="flex items-center">
                <Bell className="w-5 h-5 text-purple-600 mr-2" />
                <div>
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-gray-500 text-sm">{notification.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboardPage;
