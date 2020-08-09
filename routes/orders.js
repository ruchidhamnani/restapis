var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema({
    customerId : String,
    bookId : String,
    doi : Date
});





//Get the number of days after which if a book is rented, it can be rented by another customer
//todays date - doi > 14 => response 0, otherwise 14 - (today's date -doi)

router.get('/availabilitycheck/:bookname', (req, res) => {
    var bookcount = mongoose.model('bookinformation', ordersSchema);
    var findgenre = req.params.genre

    bookcount.find({ genre: findgenre }, 'bookname').exec(function (err, result) {

        res.send({ 'result': result });

        if (err) return handleError(err);
    })



});