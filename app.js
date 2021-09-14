const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Center = require('./models/center');


mongoose.connect('mongodb://localhost:27017/track-vac', {
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB!!!')
})


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.use(express.urlencoded({ extended: true }));




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))







app.get('/', async (req, res) => {

    const { governorate, district, name } = req.query;
    var districts = [];
    var centers = [];
    const governorates = await Center.distinct("governorate");
    // var governorates = [];

    if (governorate && district && name) {

        const centerHelper = await Center.find({ governorate, district, name });
        const districts = await Center.find({ governorate }).distinct('district');
        const centers = await Center.find({ governorate, district }).distinct('name');
        res.render('home', { centerHelper, governorates, governorate, district, name, districts, centers });
        console.log("1");

    } else if (governorate && district) {
        const centerHelper = await Center.find({ governorate, district });
        const districts = await Center.find({ governorate }).distinct('district');
        const centers = await Center.find({ governorate, district }).distinct('name');
        res.render('home', { centers, centerHelper, name, governorates, governorate, district, districts });
        console.log("2");
    }
    else if (governorate) {
        const centerHelper = await Center.find({ governorate });
        const districts = await Center.find({ governorate }).distinct('district');
        res.render('home', { districts, centerHelper, name, governorate, centers, governorates, district });
        console.log("3");
    }
    else {
        const centerHelper = await Center.find({});;
        res.render('home', { governorates, district, centerHelper, name, governorate: 'All', districts, centers });
        console.log("4");
    }

})
app.get('/:id', async (req, res,) => {
    const center = await Center.findById(req.params.id)
    res.render('center', { center });
});










app.listen(3000, () => {
    console.log('Serving on port 3000')
})