"use client";

import { useState } from "react";

// Dummy data for tracker cards
const initialTrackerData = [
  {
    id: 1,
    type: "Project",
    name: "Website Redesign",
    description: "Redesign the company website for better user experience.",
    selectedStages: "Design",
    status: "In Progress",
    assignedMember: "Alice Johnson",
    script: "This is the script for the website redesign project.",
    rawVideo: "https://example.com/raw-video",
    output: "https://example.com/final-output",
    signedMember: "John Doe",
    progressLinks: [
      {
        label: "Design Mockup",
        url: "https://drive.google.com/design-mockup",
        status: "Completed",
        assignedMember: "Alice Johnson",
      },
      {
        label: "Development Plan",
        url: "https://drive.google.com/development-plan",
        status: "In Progress",
        assignedMember: "Michael Brown",
      },
    ],
  },
  {
    id: 2,
    type: "Task",
    name: "SEO Optimization",
    description: "Optimize website content for better search engine ranking.",
    selectedStages: "Development",
    status: "Pending",
    assignedMember: "Michael Brown",
    script: "This is the script for the SEO optimization task.",
    rawVideo: "https://example.com/raw-video-seo",
    output: "https://example.com/final-output-seo",
    signedMember: "Jane Smith",
    progressLinks: [
      {
        label: "Keyword Research",
        url: "https://drive.google.com/keyword-research",
        status: "Completed",
        assignedMember: "Emily Davis",
      },
      {
        label: "Content Plan",
        url: "https://drive.google.com/content-plan",
        status: "Pending",
        assignedMember: "Michael Brown",
      },
    ],
  },
  // Add more tracker data as needed
];

export default function TrackerPage() {
  const [trackerData, setTrackerData] = useState(initialTrackerData);
  const [selectedTracker, setSelectedTracker] = useState(null); // Track the selected tracker for the modal

  // Function to open the modal
  const handleViewDetails = (tracker) => {
    setSelectedTracker(tracker);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedTracker(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trackerData.map((tracker) => (
          <div
            key={tracker.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{tracker.name}</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Type:</span> {tracker.type}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Description:</span>{" "}
              {tracker.description}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Stage:</span>{" "}
              {tracker.selectedStages}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Status:</span> {tracker.status}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Assigned Member:</span>{" "}
              {tracker.assignedMember}
            </p>

            {/* View Option */}
            <button
              onClick={() => handleViewDetails(tracker)}
              className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTracker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{selectedTracker.name}</h2>

            {/* Script */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Script
              </label>
              <textarea
                readOnly
                value={selectedTracker.script}
                className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                rows={4}
              />
            </div>

            {/* Raw Video */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Raw Video
              </label>
              <a
                href={selectedTracker.rawVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                {selectedTracker.rawVideo}
              </a>
            </div>

            {/* Output */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Output
              </label>
              <a
                href={selectedTracker.output}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                {selectedTracker.output}
              </a>
            </div>

            {/* Signed Member */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Signed Member
              </label>
              <p className="text-gray-600">{selectedTracker.signedMember}</p>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <p className="text-gray-600">{selectedTracker.status}</p>
            </div>

            {/* Progress Links */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Progress Links
              </label>
              <ul className="space-y-2">
                {selectedTracker.progressLinks.map((link, index) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:underline"
                        >
                          {link.label}
                        </a>
                        <p className="text-sm text-gray-600">
                          Status: {link.status}
                        </p>
                        <p className="text-sm text-gray-600">
                          Assigned Member: {link.assignedMember}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="w-full bg-gray-300 p-2 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
