const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId,
        ref: "category" },
});


module.exports = mongoose.model("subcategory",subcategorySchema);