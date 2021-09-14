const mongoose = require('mongoose');
const Center = require('../models/center');
const helper = require("./centers.js");




mongoose.connect('mongodb://localhost:27017/track-vac',
    err => {
        if (err) throw err;
        console.log('connected to MongoDB')
    });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});






const seedDB = async () => {
    await Center.deleteMany({});
    for (let i = 0; i < 9; i++) {
        const center = new Center({
            name: helper[i].name,
            latitude: helper[i].latitude,
            longitude: helper[i].longitude,
            governorate: helper[i].governorate,
            district: helper[i].district,
            nameArabic: helper[i].nameArabic,
            governorateArabic: helper[i].governorateArabic,
            districtArabic: helper[i].districtArabic,
            image: helper[i].image
        })
        await center.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
