const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  carWashId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CarWash',
  },
  name: { type: String, required: false },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  carwash_id: { type: Schema.Types.ObjectId, ref: 'Carwash', required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
