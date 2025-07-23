const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  kilometers_driven: { type: Number, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // assuming seller is a user
}, { timestamps: true });

module.exports = mongoose.model('Bike', BikeSchema);