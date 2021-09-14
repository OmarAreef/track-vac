const mongoose = require('mongoose');
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
    //array of reviews ref.
});

module.exports = mongoose.model('Center', centersSchema);