const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const CarWash = require('../models/carwashes');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
// Register new user to a specific car wash
const registerUser = asyncHandler(async (req, res) => {
  const { password, phone, name, number_plate } = req.body;
  const { carwash_id } = req.params;

  if (!password || !phone || !number_plate) {
    res.status(400);
    throw new Error('Please provide all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ phone });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Check if the car wash exists
  const carWash = await CarWash.findById(carwash_id);
  if (!carWash) {
    res.status(404);
    throw new Error('Car wash not found');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    password: hashedPassword,
    phone,
    name,
    number_plate,
    carwash_id: carwash_id, // Assign the carwash_id to the user
  });

  // Add the user to the car wash's users array
  carWash.users.push(user._id);
  await carWash.save();

  res.status(201).json({
    _id: user._id,
    phone: user.phone,
    name: user.name,
    number_plate: user.number_plate,
    carwash_id: user.carwash_id,
    token: generateToken(user._id),
  });
});






// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  // Check for user phone
  const user = await User.findOne({ phone });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,

      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // Fetch the currently authenticated user using the req.user object

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @desc    Get users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

// Get a single user by ID
// GET /api/users/:id
// Access: Public

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id)

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});






// Get users of a specific car wash
// GET /api/carwashes/:carwashId/users
// Access: Public

const getUsersByCarWash = asyncHandler(async (req, res) => {
  const { carwashId } = req.params;

  const carWash = await CarWash.findById(carwashId);
  if (!carWash) {
    res.status(404);
    throw new Error('Car wash not found');
  }

  const users = await User.find({ carwash_id: carwashId });
  res.status(200).json(users);
});

// Update user profile
// PUT /api/users/profile
// Access: Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone || user.phone;

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});




const washCar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the user by ID
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update the wash history
  user.washHistory.push({
    date: new Date(),
    status: 'Completed',
  });

  // Save the updated user
  await user.save();

  res.status(200).json(user);
});



// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserWashHistory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the user by ID
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Return the wash history
  res.status(200).json(user.washHistory);
});

const requestFreeWash = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    // Retrieve the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.washHistory.length < 5) {
      return res.status(400).json({ message: 'User is not eligible for a free wash yet' });
    }

    // Mark the free wash request and clear the wash history
    // user.washHistory = [];
    await user.save();

    return res.status(200).json({ message: 'Free wash requested and wash history cleared' });
  } catch (error) {
    console.error('Error requesting free wash:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

const archiveWashHistory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { washHistory } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Archive the wash history
    user.archivedWashHistory.push(...washHistory);
    
    // Clear the current wash history
    user.washHistory = [];

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Wash history archived successfully' });
  } catch (error) {
    console.error('Error archiving wash history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
);


module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUserById,
  getUsersByCarWash,
  washCar,
  updateUserProfile,
  getUserProfile,
  getUserWashHistory,
  requestFreeWash,
  archiveWashHistory,

}
