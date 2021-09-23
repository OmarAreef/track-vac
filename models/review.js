const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const reviewSchema = new Schema({
    body: String,
    location: Number,
    clean: Number,
    service: Number,
    speed: Number,
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    ,
    center_id: {
        type: Schema.Types.ObjectId,
        ref: 'Center'
    }

});
reviewSchema.virtual('averageRating').get(function() {
    return ((this.location + this.clean + this.service + this.speed)/4); 
})

module.exports = mongoose.model("Review", reviewSchema);