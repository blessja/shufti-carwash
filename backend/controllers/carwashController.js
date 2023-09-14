const asyncHandler = require('express-async-handler')
const Carwash = require('../models/carwashes')


// @desc create a carwash

// @route POST /api/carwash

// @access Private

const createCarwash = asyncHandler(async (req, res) => {
    const { name, address, phone, email, website, opening_hours, description } = req.body

    if (!name || !address || !phone || !email || !website || !opening_hours || !description) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const carwash = await Carwash.create({
        name,
        address,
        phone,
        email,
        website,
        opening_hours,
        description
    })

    if (carwash) {
        res.status(201).json({
            _id: carwash._id,
            name: carwash.name,
            address: carwash.address,
            phone: carwash.phone,
            email: carwash.email,
            website: carwash.website,
            opening_hours: carwash.opening_hours,
            description: carwash.description
        })
    } else {
        res.status(400)
        throw new Error('Invalid carwash data')
    }
}

)

// @desc get all carwash


// @route GET /api/carwash

// @access Private

const getCarwash = asyncHandler(async (req, res) => {
    const carwash = await Carwash.find({})
    res.json(carwash)
}

)

// @desc Wash a user's car
// @route POST /api/carwash/users/:userId/wash
// @access Private
const washUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
  
    const user = await User.findById(userId);
  
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    // Perform car wash operation for the user
    user.carWashed = true;
    await user.save();
  
    res.json({ message: 'Car washed successfully' });
  });
  


module.exports = { createCarwash, getCarwash, washUser }