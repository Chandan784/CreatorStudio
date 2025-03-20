"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]); // State to store all projects
  const [editingProjectId, setEditingProjectId] = useState(null); // State to track which project is being edited

  // Fetch all projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/projects"
        ); // Replace with your API endpoint
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Handle saving the edited project
  const handleSave = async (updatedProject) => {
    console.log(updatedProject._id, "updateProject");

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/projects/${updatedProject._id}`,
        updatedProject
      ); // Replace with your API endpoint
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === updatedProject._id ? response.data : project
        )
      );
      setEditingProjectId(null); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Handle input changes for project details
  const handleProjectChange = (projectId, field, value) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId ? { ...project, [field]: value } : project
      )
    );
  };

  // Handle input changes for stage details
  const handleStageChange = (projectId, stageId, field, value) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              stages: project.stages.map((stage) =>
                stage._id === stageId ? { ...stage, [field]: value } : stage
              ),
            }
          : project
      )
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Client Projects</h1>

      {/* Project Cards */}
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-6 rounded-lg shadow-md">
            {/* Project Details */}
            {editingProjectId === project._id ? (
              // Edit Mode: Show Full Form
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={project.project_name}
                    onChange={(e) =>
                      handleProjectChange(
                        project._id,
                        "project_name",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(
                        project._id,
                        "description",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={
                      new Date(project.starting_date)
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      handleProjectChange(
                        project._id,
                        "starting_date",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={
                      new Date(project.ending_date).toISOString().split("T")[0]
                    }
                    onChange={(e) =>
                      handleProjectChange(
                        project._id,
                        "ending_date",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Manager Name
                  </label>
                  <input
                    type="text"
                    value={project.manager_name || ""}
                    onChange={(e) =>
                      handleProjectChange(
                        project._id,
                        "manager_name",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Manager Contact Number
                  </label>
                  <input
                    type="text"
                    value={project.manager_contact || ""}
                    onChange={(e) =>
                      handleProjectChange(
                        project._id,
                        "manager_contact",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                {/* Stages */}
                {project.stages.map((stage) => (
                  <div key={stage._id} className="border p-4 rounded-lg mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Stage: {stage.name}
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        value={stage.status}
                        onChange={(e) =>
                          handleStageChange(
                            project._id,
                            stage._id,
                            "status",
                            e.target.value
                          )
                        }
                        className={`w-full p-2 rounded-md ${
                          stage.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : stage.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Drive Link
                      </label>
                      <input
                        type="text"
                        value={stage.drive_link}
                        onChange={(e) =>
                          handleStageChange(
                            project._id,
                            stage._id,
                            "drive_link",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Assigned To
                      </label>
                      <input
                        type="text"
                        value={stage.assigned}
                        onChange={(e) =>
                          handleStageChange(
                            project._id,
                            stage._id,
                            "assigned",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                ))}
                {/* Save and Cancel Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setEditingProjectId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(project)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              // View Mode: Show Project Details
              <>
                <h2 className="text-xl font-semibold mb-2">
                  {project.project_name}
                </h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Start Date:</span>{" "}
                  {new Date(project.starting_date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">End Date:</span>{" "}
                  {new Date(project.ending_date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Manager Name:</span>{" "}
                  {project.manager_name || "Not provided"}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Manager Contact:</span>{" "}
                  {project.manager_contact || "Not provided"}
                </p>
                {/* Stages */}
                <div className="flex space-x-4 overflow-x-auto">
                  {project.stages.map((stage) => (
                    <div
                      key={stage._id}
                      className="flex-shrink-0 w-64 p-4 border rounded-lg"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {stage.name}
                      </h3>
                      <p
                        className={`mb-2 p-2 rounded-md ${
                          stage.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : stage.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {stage.status}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Drive Link:</span>{" "}
                        {stage.drive_link || "Not provided"}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Assigned To:</span>{" "}
                        {stage.assigned || "Not assigned"}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Edit Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setEditingProjectId(project._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
