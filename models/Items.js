const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemname:{ type: String,unique:true, required: true },
    photoUrl: String,
    parentcategory:{ type: String, required: true },
    subcategories:{
        type: [{
            // Define the structure of each object in the array
            item_id:  {  type: mongoose.Schema.Types.ObjectId,
                ref: "ItemSchema", },
            category_name:{type:String}
          }]
    },
    
});


module.exports = mongoose.model("items", ItemSchema);