// src/components/Portfolio.js
import React, { useState } from 'react';
import AddProject from './AddProject';
import ProjectList from './ProjectList';

const Portfolio = ({ token }) => {
  const [projects, setProjects] = useState([]);

  const handleProjectAdded = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Portfolio Builder</h1>
      <AddProject token={token} onProjectAdded={handleProjectAdded} />
      <ProjectList token={token} />
    </div>
  );
};

export default Portfolio;
