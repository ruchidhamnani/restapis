var utils = require("../../utils");
var Schema = utils.mongoose.Schema;
var booksSchema = new Schema({
    bookname: String,
    author: String,
    genre: String,
    price: Number,
    date_of_publish: Date,
    no_of_pages: Number,
    for_age_above: Number,
    total_quantity : Number,
    available_copies : Number
});

module.exports = {
    schema: booksSchema
};