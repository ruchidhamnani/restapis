var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { route } = require('./books');
var Schema = mongoose.Schema;



var booksSchema = require('../models/schema/booksSchema')

//Update the price of a book
router.get('/price',(req,res)=>{
    var bookcount = mongoose.model('bookinformation', booksSchema);
     bookcount.update({bookname : req.query.bookname}, {$set : {'price' : req.query.newprice}}, function(err,b){
        if(err) res.send("error");
        else{
            res.send("Successfully Updated price")
        }
    })
    
})

//Update genre

router.get('/genre',(req,res)=>{
    var bookcount = mongoose.model('bookinformation', booksSchema);
     bookcount.update({bookname : req.query.bookname}, {$set : {'genre' : req.query.newgenre}}, function(err,b){
        if(err) res.send("error");
        else{
            res.send("Successfully Updated genre")
        }
    })
    
})

//Remove a book

router.get('/removebook',(req,res)=>{
    var bookcount = mongoose.model('bookinformation', booksSchema);
    bookcount.findOneAndRemove({bookname: req.query.bookname}, {}, function(err,b){
        if(err) res.send("error");
        else{
            res.send("removed the book");
        }
    })

})


module.exports = router;