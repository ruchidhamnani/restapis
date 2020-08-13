const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ordersSchema = new Schema({
    customerId: {type: Schema.ObjectId , ref: 'customerinformations' },
    bookId: {type: Schema.ObjectId , ref: 'bookinformations' },
    doi: Date,
    
});

let ordersModel = mongoose.model('orderinformation', ordersSchema);

module.exports = ordersModel;