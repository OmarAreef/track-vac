const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    location: Number,
    clean: Number,
    service: Number,
    speed: Number
    //ref. to user to be added
});

module.exports = mongoose.model("Review", reviewSchema);