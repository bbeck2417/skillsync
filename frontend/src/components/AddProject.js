// src/components/AddProject.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProject = ({ token, onProjectAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    liveLink: '',
    repoLink: '',
    image: null,  // New state for image
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files[0],  // Handle image file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle image upload first
    let imageUrl = '';
    if (formData.image) {
      const formDataImage = new FormData();
      formDataImage.append('image', formData.image);

      try {
        const imageRes = await axios.post('/api/projects/upload-image', formDataImage, {
          headers: { Authorization: `Bearer ${token}` },
        });
        imageUrl = imageRes.data.imageUrl;
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }

    const payload = {
      ...formData,
      techStack: formData.techStack.split(',').map(t => t.trim()),
      image: imageUrl,  // Add image URL to payload
    };

    try {
      const res = await axios.post('/api/projects', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onProjectAdded(res.data);  // Optional: lift state up if needed
      setFormData({ title: '', description: '', techStack: '', liveLink: '', repoLink: '', image: null });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full mb-2 p-2 border" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full mb-2 p-2 border" />
      <input name="techStack" value={formData.techStack} onChange={handleChange} placeholder="Tech Stack (comma-separated)" className="w-full mb-2 p-2 border" />
      <input name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="Live Link" className="w-full mb-2 p-2 border" />
      <input name="repoLink" value={formData.repoLink} onChange={handleChange} placeholder="Repo Link" className="w-full mb-2 p-2 border" />
      
      <div className="mb-2">
        <label className="block">Upload Image</label>
        <input type="file" name="image" onChange={handleChange} className="w-full mb-2 p-2 border" />
      </div>
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Project</button>
    </form>
  );
};

export default AddProject;
