const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderno: { type: String,unique:true, required: true },
    itemscart:{
        type: [{
            // Define the structure of each object in the array
            item_id: {type:String},
          }]
    },
    finalTotal: { type: String,unique:true, required: true },
    customername: { type: String,unique:true, required: true },
    customerAddress: { type: String,unique:true, required: true },
    phone: { type: String,unique:true, required: true },
    city: { type: String,unique:true, required: true },
    apartment: { type: String,unique:true, required: true },
    state: { type: String,unique:true, required: true },
    zip: { type: String,unique:true, required: true },
    
});


module.exports = mongoose.model("Orders", OrderSchema);