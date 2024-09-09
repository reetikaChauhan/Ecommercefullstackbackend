const mongoose = require('mongoose');
const subcategory = require('./subcategory');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
  subcategory_id:{type: mongoose.Schema.Types.ObjectId, ref: 'subcategory'},
  photoUrl: String ,// URL to the product image
  description: {
    type: String,
    required: true
  },
  preferences: {
    type: [String], // Array of preference tags
    required: true
  },
    
});

// Index for preferences array
ItemSchema.index({ preferences: 1 });

// Text index for description
ItemSchema.index({ description: 'text' });

module.exports = mongoose.model("items", ItemSchema);