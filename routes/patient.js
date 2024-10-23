const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Get patient profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update patient profile
router.put('/profile', auth, async (req, res) => {
  const { name, age, allergies, medications } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.name = name || user.name;
    user.age = age || user.age;
    user.allergies = allergies || user.allergies;
    user.medications = medications || user.medications;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get patient dashboard (basic health reminders and appointments)
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const healthTip = `Remember to take your medications, ${user.name}!`;  // Example tip
    const appointments = ['Check-up on Oct 30, 2024', 'Dental cleaning on Nov 10, 2024'];  // Example mock appointments

    res.json({
      healthTip,
      appointments
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
