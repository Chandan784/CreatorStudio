import { motion } from "framer-motion";
import { useState } from "react";
import "../app/globals.css";

export default function ScriptTracker() {
  const [videos] = useState([
    {
      date: "25/12/2024",
      name: "Video-001",
      script: "Approved",
      footage: "Captured",
      output: "Approved",
    },
    {
      date: "25/12/2024",
      name: "Video-002",
      script: "Approved",
      footage: "Captured",
      output: "In Review",
    },
    {
      date: "25/12/2024",
      name: "Video-003",
      script: "In Review",
      footage: "Captured",
      output: "Approved",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex flex-col items-center p-6">
      <motion.div
        className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-full max-w-3xl border border-gray-200 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          🎬 Script Tracker
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Monitor your video script progress in real time.
        </p>

        <div className="mt-6 w-full space-y-6">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-md border border-gray-300 p-5 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center text-center md:text-left hover:shadow-lg transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-full">
                <p className="text-lg font-semibold text-gray-800">
                  🎥 {video.name}
                </p>
                <p className="text-gray-500 text-sm">
                  📅 Target Date: {video.date}
                </p>
                <p className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                  📝 View Script: {video.script}
                </p>
                <p className="text-sm text-purple-600 font-medium cursor-pointer hover:underline">
                  🎞️ Raw Footage: {video.footage}
                </p>
                <p className="text-sm text-green-600 font-medium cursor-pointer hover:underline">
                  ✅ Output: {video.output}
                </p>
              </div>
              <motion.button
                className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-all mt-4 md:mt-0 w-full md:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
