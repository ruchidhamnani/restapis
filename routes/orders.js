var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;



var booksSchema = require('../models/schema/booksSchema')
var ordersSchema = require('../models/schema/ordersSchema')


//Get the number of days after which if a book is rented, it can be rented by another customer
//check availableCopies filed in booksinformations collection, if that is zero then proceed else return answer 0
//sort by date the documents in orderinformation collection havving this bookname and pick the date which is oldest doi.
//todays date - doi > 14 => response 0, otherwise 14 - (today's date -doi)

router.get('/availabilitycheck/:bookname', (req, res) => {
    var availablebooks = mongoose.model('bookinformation', booksSchema);
    var nameofbook = req.params.bookname

    availablebooks.find({ $and: [{ bookname: nameofbook }, { availableCopies: { $gte: 1 } }] }).count().exec(function (err, result) {
        if (result > 0) {
            res.send({ 'noOfDays': 0 })
        }
        else {

            var multipleCopies = mongoose.model('orderinformation', ordersSchema);
            multipleCopies.find({ bookname: nameofbook }, 'doi').sort({ date: 'desc' }).exec(function (err, result) {
                var doi = (JSON.stringify(result[0]['doi']));
                var doi_ = doi.slice(1, 11);
                var _doi = new Date(doi_);
                var currD = (JSON.stringify(new Date()));
                var currD_ = currD.slice(1, 11);
                var _currD = new Date(currD_);
                var diff = 14 - ((_currD - _doi) / 86400000);

                res.send({ 'result': diff })
            })

        }


        if (err) return handleError(err);
    })



});


//by customerNumber find all orders placed 
//today's date - doi check if less than 14 show in result the details and increse cnt by one



router.get('/booksrentedbyacustomer/:customerNumber', (req, res) => {
    var rentedbooks = mongoose.model('orderinformation', ordersSchema);
    var customerIdentifier = req.params.customerNumber
    var currD = ((new Date()));
        currD.setDate(currD.getDate()-14);
        var s = JSON.stringify(currD);
                var currD_ = s.slice(1, 11);
                var _currD = new Date(currD_);
    rentedbooks.find({$and: [{ customerId: customerIdentifier },{ doi: { $gte: currD_ } }]}, 'bookname doi').exec(function (err, result) {
        
        res.send({ 'noOfBooks': result.length,'result': result });

        if (err) return handleError(err);
    })



});

//by customerNumber get orders of user in last 100 days
//for each bookname in this result search for price in 1st collection


router.get('/moneyspentbyauser/:customerNumber', (req,res) => {
    var rentedbooks = mongoose.model('orderinformation', ordersSchema);
    var customerIdentifier = req.params.customerNumber
    var currD = ((new Date()));
        currD.setDate(currD.getDate()-100);
        var s = JSON.stringify(currD);
                var currD_ = s.slice(1, 11);

                rentedbooks.find({$and: [{ customerId: customerIdentifier },{ doi: { $gte: currD_ } }]}, 'bookname doi').exec(function (err, result) {
                   let TotalCost = 0;
                    result.forEach(element => {
                        

                        var findmoney = mongoose.model('bookinformation',booksSchema);
                        var x = element.get('bookname');
                        
                        findmoney.find({ bookname : x }, 'price').exec(function(err,result_2){
                            
                            TotalCost += result_2[0]['price'];
                            
                        })
                    });
                   
                    console.log("abcd");
                    console.log(TotalCost);

                    res.send({ 'rrrrr': TotalCost });
            
                    if (err) return handleError(err);
                })


});

module.exports = router;
