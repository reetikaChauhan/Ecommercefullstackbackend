const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    subcategories: [
        {
            subcategory_id: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Subcategory' 
            }
        }
    ],
    categoryPicUrl: String
});


module.exports = mongoose.model("category",categorySchema);