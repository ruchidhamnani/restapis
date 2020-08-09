var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var booksSchema = require('./../models/schema/booksSchema');
/* GET total count of books*/
var booksSchema = new Schema({
    bookname: String,
    author: String,
    genre: String,
    price: Number,
    dateOfPublish: Date,
    noOfPages: Number,
    forAgeAbove: Number,
    totalQuantity: Number,
    availableCopies: Number
});
//get totalcount of books
router.get('/totalcount', (req, res) => {
    var bookcount = mongoose.model('bookinformation', booksSchema);
    bookcount.aggregate([{
        $group: {
            _id: 0,
            total: {
                $sum: "$totalQuantity"
            }
        }
    },
        {
        $project: {
            _id: 0,
            total: 1
        }
    }], function (err, result) {
        console.log(result);
        res.send({ 'result': result });

        if (err) return handleError(err);
    });

});

//get all the books of a given author
router.get('/findbyauthor/:authorname', (req, res) => {
    var bookcount = mongoose.model('bookinformation', booksSchema);
    var authorname = req.params.authorname

    bookcount.find({ author: authorname }, 'bookname').exec(function (err, result) {

        res.send({ 'result': result });

        if (err) return handleError(err);
    })



});
//pattern (wrong)


router.get('/findbyauthor/:pattern', (req, res) => {
    var bookcount = mongoose.model('bookinformation', booksSchema);
    

    bookcount.find({ author: { "$regex": req.params.pattern , "$options": "i" }}, 'bookname').exec(function (err, result) {

        res.send({ 'result': result });

        if (err) return handleError(err);
    })



});




//get all books of a given genre
router.get('/findbygenre/:genre', (req, res) => {
    var bookcount = mongoose.model('bookinformation', booksSchema);
    var findgenre = req.params.genre

    bookcount.find({ genre: findgenre }, 'bookname').exec(function (err, result) {

        res.send({ 'result': result });

        if (err) return handleError(err);
    })



});

//get all the rented books
router.get('/rentedcount', (req, res) => {
    var bookcount = mongoose.model('bookinformation', booksSchema);
    bookcount.aggregate([
       
    {
        $group : {
            _id: null,
            rentedCopies : { $sum : { $subtract: [ '$totalQuantity', '$availableCopies']}}
    }
},
{
    $project: {
        _id : 0,
        rentedCopies : 1
    }
}
], function (err, result) {
        console.log(result);
        res.send({ 'result': result });

        if (err) return handleError(err);
    });

});







module.exports = router;