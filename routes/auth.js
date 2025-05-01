const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const User = require('../models/User');

// Existing register route
router.post('/register', registerUser);

// New login route
router.post('/login', loginUser);

const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // Fetch user info from the DB using the ID stored in `req.user`
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);  // Send back user data, excluding password
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});
// Middleware to check if the user is authenticated

module.exports = router;
