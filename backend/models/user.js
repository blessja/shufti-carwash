// models/userModel.js

const mongoose = require('mongoose');


const washSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
}); 

const userSchema = mongoose.Schema(
  
  {
    carwash_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CarWash',
    },
    name: {
      type: String,
      required: [false, 'Please add a name'],
    },
    address: {
      type: String,
      required: [false, 'Please add an address'],
    },
    city: {
      type: String,
      required: [false, 'Please add a city'],
    },
    
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    number_plate: {
      type: String,
      required: false,
      unique: true,
    },
    // car: {
    //   type: String,
    //   required: false,
    // },
    washHistory: [washSchema], // Add the wash history field
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
