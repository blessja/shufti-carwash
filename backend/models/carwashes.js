const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carWashSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: false },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  staff: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Carwash = mongoose.model('Carwash', carWashSchema);

module.exports = Carwash;


  