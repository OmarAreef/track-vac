const mongoose = require('mongoose');
const Center = require('../models/center');
const Day = require('../models/day');
const User = require('../models/user');
const helper = require("./centers.js");
const helper1 = require("./users.js");



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
    await Day.deleteMany({});
    const sun = new Day({ day: 'sun', From: '8:00', To: '21:00' });
    const mon = new Day({ day: 'mon', From: '8:00', To: '21:00' });
    const tue = new Day({ day: 'tue', From: '8:00', To: '21:00' });
    const wed = new Day({ day: 'wed', From: '8:00', To: '21:00' });
    const thu = new Day({ day: 'thu', From: '8:00', To: '21:00' });
    const fri = new Day({ day: 'fri', From: '8:00', To: '21:00' });
    const sat = new Day({ day: 'sat', From: '8:00', To: '21:00' });
    await sun.save();
    await mon.save();
    await tue.save();
    await wed.save();
    await thu.save();
    await fri.save();
    await sat.save();
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
            image: helper[i].image,
            workingHours: [sun, mon, tue, wed, thu, fri, sat]
        })
        await center.save();
    }
    await User.deleteMany({});
    for (let i = 0; i < 3; i++) {
        const user = new User({
            reg_num: helper1[i].reg_num,
            pass: helper1[i].pass,
            userType: helper1[i].userType
        })
        await user.save();
    }

}


seedDB().then(() => {
    mongoose.connection.close();
})