//connect to DB
const mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/db_my';
mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.set("debug", true);

module.export = mongoose;