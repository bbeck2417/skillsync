// src/components/ProjectList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = ({ token }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) return; // Ensure token is not null

      try {
        const res = await axios.get('http://localhost:5000/api/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, [token]);

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const handleAddProject = (newProject) => {
    setProjects([newProject, ...projects]);  // Add the new project to the list
  };

  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-bold">{project.title}</h3>
              {project.image && (
                <img src={project.image} alt={project.title} className="w-40 h-40 object-cover mb-2" />
              )}
              <p>{project.description}</p>
              <div>
                <strong>Tech Stack:</strong> {project.techStack.join(', ')}
              </div>
              <div>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Link</a> | 
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer"> Repo Link</a>
              </div>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Delete Project
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no projects yet. Add one to start building your portfolio!</p>
      )}
    </div>
  );
};

export default ProjectList;
