const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Received:", { username, email, password });
  
    try {
      const existing = await User.findOne({ email });
      console.log("Existing user:", existing);
  
      if (existing) return res.status(400).json({ msg: 'User already exists' });
  
      const user = new User({ username, email, password });
      await user.save();  // <-- Common failure point
      console.log("User saved");
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (err) {
      console.error("Error during registration:", err.message);
      res.status(500).json({ msg: 'Server error', error: err.message });
    }
  };
  
  const bcrypt = require('bcryptjs'); // make sure it's imported

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
