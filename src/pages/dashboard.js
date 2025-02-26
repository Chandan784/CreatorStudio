import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProgressBar from "@/components/common/ProgressBar";
import "../app/globals.css";
import { useRouter } from "next/router";

export default function Dashboard() {
  let route = useRouter();
  const [user] = useState({
    name: "Meera",
    avatar: "/assets/images/auth/login.svg", // Replace with a real image
    stats: {
      scriptsReady: 13,
      totalScripts: 15,
      videosReady: 5,
      totalVideos: 10,
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Card Container */}
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full md:max-w-2xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* User Info */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Welcome {user.name}</h2>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full border-2 border-gray-300"
          />
        </div>

        <p className="text-gray-500 mt-2">
          Congratulations! Your videos have reached{" "}
          <span className="font-bold">26.5M views.</span> Increase your video
          frequency!
        </p>

        <motion.button
          className="mt-4 w-full bg-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-purple-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Increase my reach
        </motion.button>

        {/* Progress Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">This Month’s Progress</h3>
          <div className="mt-4 space-y-4">
            <ProgressBar
              label="Scripts Ready"
              value={user.stats.scriptsReady}
              max={user.stats.totalScripts}
              color="bg-purple-600"
            />
            <motion.button
              className="mt-2 w-full bg-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-purple-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => route.push("/script-tracker")}
            >
              View Scripts
            </motion.button>
            <ProgressBar
              label="Videos Ready"
              value={user.stats.videosReady}
              max={user.stats.totalVideos}
              color="bg-pink-500"
            />
            <motion.button
              className="mt-2 w-full bg-pink-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-pink-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Shooting
            </motion.button>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Choose Your Theme</h3>
          <div className="flex gap-4 mt-3">
            <div className="w-24 h-32 bg-blue-500 rounded-lg shadow-md flex items-center justify-center text-white text-sm font-semibold">
              Customize
            </div>
            <div className="w-24 h-32 bg-gray-300 rounded-lg shadow-md flex items-center justify-center text-gray-700 text-sm font-semibold">
              Default
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
