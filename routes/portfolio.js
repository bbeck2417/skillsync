const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Project = require('../models/Project');
const authMiddleware = require('../middleware/authMiddleware');


// Create new project
router.post('/', authMiddleware, async (req, res) => {
  try {
    const project = new Project({
      userId: req.user.userId,
      ...req.body
    });
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Setup multer storage engine for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');  // Specify upload directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));  // Ensure unique file names
    }
  });
const upload = multer({ storage: storage });
// Upload project image
router.post('/upload-image', authMiddleware, upload.single('image'), async (req, res) => {
    try {
      const imageUrl = `/uploads/${req.file.filename}`;  // File path to send to frontend
      res.json({ imageUrl });
    } catch (err) {
      res.status(500).json({ error: 'Image upload failed' });
    }
  });

// Get all projects for current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a project
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
