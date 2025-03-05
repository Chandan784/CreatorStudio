"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Tracker = () => {
  let route = useRouter();
  const dummyData = {
    projects: [
      {
        id: 1,
        title: "Project A",
        targetDate: "March 10, 2025",
        script: { status: "Approved" },
        rawFootage: { status: "In Progress" },
        output: { status: "Pending" },
      },
      {
        id: 2,
        title: "Project B",
        targetDate: "March 15, 2025",
        script: { status: "Pending" },
        rawFootage: { status: "Approved" },
        output: { status: "In Progress" },
      },
      {
        id: 3,
        title: "Project C",
        targetDate: "March 20, 2025",
        script: { status: "In Progress" },
        rawFootage: { status: "Pending" },
        output: { status: "Approved" },
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Project Tracker</h2>
      <div className="w-full max-w-4xl">
        {dummyData.projects.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white p-6 shadow-lg rounded-lg mb-6 border-l-4 border-purple-500 w-full"
            whileHover={{ scale: 1.02 }}
          >
            {/* First Row */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-500">Target Date: {item.targetDate}</p>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                onClick={() => route.push(`/dashboard/project-details/6464`)}
              >
                View
              </button>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Script Status", status: item.script.status },
                { label: "Raw Footage Status", status: item.rawFootage.status },
                { label: "Output Status", status: item.output.status },
              ].map((statusItem, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-3 rounded-md text-center"
                >
                  <p className="text-gray-700">{statusItem.label}</p>
                  <span
                    className={`px-3 py-1 text-sm font-bold rounded-full mt-2 inline-block ${
                      statusItem.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : statusItem.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {statusItem.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tracker;
