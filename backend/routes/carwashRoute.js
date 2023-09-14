const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CarWash = require('../models/carwashes');
const User = require('../models/user');

// Get all car washes
router.get('/', async (req, res) => {
  try {
    const carWashes = await CarWash.find();
    res.json(carWashes);
  } catch (error) {
    console.error('Error fetching car washes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a car wash by ID
router.get('/:id', async (req, res) => {
  try {
    const carWashId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(carWashId)) {
      return res.status(400).json({ message: 'Invalid car wash ID' });
    }

    const carWash = await CarWash.findById(carWashId);
    if (!carWash) {
      return res.status(404).json({ message: 'Car wash not found' });
    }

    res.json(carWash);
  } catch (error) {
    console.error('Error fetching car wash:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// get all users of a car wash 
router.get('/:id/users', async (req, res) => {
  try {
    const carWashId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(carWashId)) {
      return res.status(400).json({ message: 'Invalid car wash ID' });
    }

    const carWash = await CarWash.findById(carWashId);
    if (!carWash) {
      return res.status(404).json({ message: 'Car wash not found' });
    }

    const userIds = carWash.users; // Array of user IDs

    // Fetch the actual user objects using the IDs
    const users = await User.find({ _id: { $in: userIds } });

    res.json(users);
  } catch (error) {
    console.error('Error fetching car wash users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get a specific user of a car wash
router.get('/:id/users/:userId', async (req, res) => {
  try {
    const carWashId = req.params.id;
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(carWashId)) {
      return res.status(400).json({ message: 'Invalid car wash ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const carWash = await CarWash.findById(carWashId);
    if (!carWash) {
      return res.status(404).json({ message: 'Car wash not found' });
    }

    const user = await User.findOne({ _id: userId, carwash_id: carWashId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching car wash user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// ... Rest of the code

module.exports = router;
