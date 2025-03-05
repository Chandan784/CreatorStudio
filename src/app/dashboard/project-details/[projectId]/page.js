"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState("script");
  const [isMobile, setIsMobile] = useState(false);

  // Check if the user is on a mobile device
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Dummy Project Data
  const projectData = {
    6464: {
      title: "Project A",
      description: "This project is focused on high-quality video production.",
      createdAt: "February 20, 2025",
      lastUpdated: "March 5, 2025",
      status: "In Progress",
      script: {
        status: "Approved",
        editDoc:
          "https://docs.google.com/document/d/1rs29z-yrUygB4966OJveML2smE2gl043/edit",
      },
      rawFootage: {
        status: "In Progress",
        editDoc:
          "https://docs.google.com/document/d/1rs29z-yrUygB4966OJveML2smE2gl043/edit",
      },
      output: {
        status: "Pending",
        editDoc:
          "https://docs.google.com/document/d/1rs29z-yrUygB4966OJveML2smE2gl043/edit",
      },
    },
  };

  const project = projectData[projectId];

  if (!project) {
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        ❌ Project not found.
      </p>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      {/* Project Overview */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full text-center">
        <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
        <p className="text-gray-600 mt-2">{project.description}</p>

        <div className="mt-4 text-gray-500 text-sm">
          <p>📅 Created: {project.createdAt}</p>
          <p>🔄 Last Updated: {project.lastUpdated}</p>
          <p className="mt-2">
            <span className="font-semibold text-gray-800">Status: </span>
            <span
              className={`px-2 py-1 rounded-md text-white ${
                project.status === "In Progress"
                  ? "bg-yellow-500"
                  : project.status === "Completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {project.status}
            </span>
          </p>
        </div>
      </div>

      {/* Centered Tabs */}
      <div className="flex justify-center space-x-4 mt-6">
        {["script", "rawFootage", "output"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-md text-sm font-semibold transition shadow-md ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab === "script"
              ? "📜 Script"
              : tab === "rawFootage"
              ? "🎥 Raw Footage"
              : "🎬 Final Video"}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="w-full max-w-4xl bg-white p-6 mt-6 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold capitalize text-gray-900">
          {activeTab} Status
        </h3>
        <p className="text-gray-600 mt-2 text-lg">
          Status:{" "}
          <span className="font-semibold text-blue-600">
            {project[activeTab].status}
          </span>
        </p>

        {isMobile ? (
          // Mobile: Show only the link
          <div className="mt-4 text-center">
            <a
              href={project[activeTab].editDoc}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-lg font-semibold hover:text-blue-800 transition"
            >
              🔗 Open Google Doc in New Tab
            </a>
          </div>
        ) : (
          // Desktop: Show embedded iframe with "Open in New Tab" at the top center
          <>
            <div className="flex justify-center mt-4">
              <a
                href={project[activeTab].editDoc}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
              >
                🔗 Open in New Tab
              </a>
            </div>
            <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <iframe
                src={project[activeTab].editDoc}
                width="100%"
                height="600px"
                className="border-none"
              ></iframe>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
