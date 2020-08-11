const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema({
    customerId: Number,
    bookId: String,
    doi: Date,
    customerNumber: Number
});

module.exports = ordersSchema ;