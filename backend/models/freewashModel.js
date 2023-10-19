// models/freewashModel.js

const mongoose = require('mongoose');

const freeWashRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
  // Add any other relevant fields here
  // For example, you can include details about the request.
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FreeWashRequest', freeWashRequestSchema);
