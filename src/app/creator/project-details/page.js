"use client";
import React, { useState } from "react";

function CreatorProjectDetailsPage({ projectId }) {
  // Mock project data (replace with actual data fetching logic)
  const project = {
    id: projectId,
    title: "Sample Project",
    description: "This is a sample project description.",
    stages: [
      {
        id: 1,
        name: "Stage 1: Planning",
        details: "This is the planning stage of the project.",
      },
      {
        id: 2,
        name: "Stage 2: Design",
        details: "This is the design stage of the project.",
      },
      {
        id: 3,
        name: "Stage 3: Development",
        details: "This is the development stage of the project.",
      },
      {
        id: 4,
        name: "Stage 4: Testing",
        details: "This is the testing stage of the project.",
      },
      {
        id: 5,
        name: "Stage 5: Deployment",
        details: "This is the deployment stage of the project.",
      },
    ],
    driveLink: "https://drive.google.com/drive/folders/sample-link",
  };

  const [activeStage, setActiveStage] = useState(project.stages[0]);

  return (
    <div className="project-details-page">
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <div className="drive-link">
        <a href={project.driveLink} target="_blank" rel="noopener noreferrer">
          View Project Drive
        </a>
      </div>

      <div className="stages-tabs">
        {project.stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(stage)}
            className={activeStage.id === stage.id ? "active" : ""}
          >
            {stage.name}
          </button>
        ))}
      </div>

      <div className="stage-details">
        <h2>{activeStage.name}</h2>
        <p>{activeStage.details}</p>
      </div>
    </div>
  );
}

export default CreatorProjectDetailsPage;
