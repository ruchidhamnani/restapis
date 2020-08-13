var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;



var booksSchema = require('../models/schema/booksSchema')

var utils = require('../models/businesslogic/utils')



//get totalcount of books
router.get('/totalcount', (req, res) => {
      utils.Totalbookcount().then(result =>{
        res.send({'totalcount' : result});
      } );
    

});

//get all the books of a given author
router.get('/findbyauthor/:authorname', (req, res) => {
    var authorname = req.params.authorname
    utils.FindByAuthor(authorname).then(result => {
        res.send({'result' : result});
    });


});
//find by pattern 


router.get('/findbypattern/:pattern', (req, res) => {
    var pattern = req.params.pattern
    utils.FindByPattern(pattern).then(result=>{
        res.send({'result' : result});

    });



});




//get all books of a given genre
router.get('/findbygenre/:genre', (req, res) => {
    var genre = req.params.genre
    utils.FindByGenre(genre).then(result=>{
        res.send({'result' : result});

    });



});

//get all the rented books
router.get('/rentedcount', (req, res) => {
    utils.TotalRentedBooks().then(result=>{
        res.send({'result' : result});

    });
});






module.exports = router;
