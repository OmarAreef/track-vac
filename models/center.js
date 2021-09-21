const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;




const centersSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    governorate: String,
    district: String,
    nameArabic: String,
    governorateArabic: String,
    districtArabic: String,
    workingHours: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Day'
        }
    ],
    image: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
});

centersSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Center', centersSchema);