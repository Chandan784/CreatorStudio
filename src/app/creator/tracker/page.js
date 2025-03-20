"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const CreatorTrackerPage = ({ planId }) => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects based on planId
  useEffect(() => {
    if (planId) {
      axios
        .get(`http://localhost:8000/api/v1/projects/${planId}/projects`)
        .then((response) => {
          setProjects(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
          setError("Failed to fetch projects. Please try again later.");
          setLoading(false);
        });
    }
  }, [planId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Project Tracker</h2>
      <div className="w-full max-w-4xl">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            className="bg-white p-6 shadow-lg rounded-lg mb-6 border-l-4 border-purple-500 w-full"
            whileHover={{ scale: 1.02 }}
          >
            {/* First Row */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {project.project_name}
                </h3>
                <p className="text-gray-500">
                  Description: {project.description}
                </p>
                <p className="text-gray-500">
                  Start Date:{" "}
                  {new Date(project.starting_date).toLocaleDateString()}
                </p>
                <p className="text-gray-500">
                  End Date: {new Date(project.ending_date).toLocaleDateString()}
                </p>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
                onClick={() => router.push(`/creator/project-details`)}
              >
                View
              </button>
            </div>

            {/* Second Row - Stages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.stages.map((stage, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-3 rounded-md text-center"
                >
                  <p className="text-gray-700">{stage.name}</p>
                  <span
                    className={`px-3 py-1 text-sm font-bold rounded-full mt-2 inline-block ${
                      stage.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : stage.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {stage.status}
                  </span>
                  <p className="text-gray-500 mt-2">
                    Assigned: {stage.assigned || "Not Assigned"}
                  </p>
                  <p className="text-gray-500">
                    Drive Link:{" "}
                    {stage.drive_link ? (
                      <a
                        href={stage.drive_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Open Drive
                      </a>
                    ) : (
                      "Not Available"
                    )}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CreatorTrackerPage;
