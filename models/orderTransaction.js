const mongoose = require('mongoose');

const OrderTransactionSchema = new mongoose.Schema({
    orderno: { type: String,unique:true, required: true },
    customername: { type: String,unique:true, required: true },
    finalTotal: { type: String,unique:true, required: true },
    Moreless: { type: String,unique:true, required: true },
    OrderTotal: { type: String,unique:true, required: true },
    FinalTotal: { type: String,unique:true, required: true },
    cashPayment: { type: String,unique:true, required: true },
    OnlinePayment: { type: String,unique:true, required: true },
    OnlineTip: { type: String,unique:true, required: true },
    DeliveryFees: { type: String,unique:true, required: true },
});


module.exports = mongoose.model("OrderTransaction", OrderTransactionSchema);