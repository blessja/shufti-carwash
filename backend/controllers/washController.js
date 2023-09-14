// controllers/washController.js

const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// @desc    Update user's wash history
// @route   POST /api/users/:id/wash
// @access  Private
const updateWashHistory = asyncHandler(async (req, res) => {
    const { date, status } = req.body;
  
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.washHistory.push({ date, status: 'Completed' });
      const updatedUser = await user.save();
      res.status(200).json({
        message: 'Wash completed',
        user: updatedUser,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
  
  module.exports = { updateWashHistory };
  
