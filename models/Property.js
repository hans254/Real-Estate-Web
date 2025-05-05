const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['house', 'apartment', 'land'], required: true },
  status: { type: String, enum: ['available', 'not available'], default: 'available' },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  area: { type: Number },
  images: [{ type: String }],
  features: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Property', propertySchema);