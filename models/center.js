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
    // to be continued
    // workingDays:[{
    //     day: String,
    // }] 
    image: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
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