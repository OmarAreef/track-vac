const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Center = require('./models/center');

const Review = require('./models/review');
const methodOverride = require('method-override');



const engine = require('ejs-mate');


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
app.use(methodOverride('_method'));




app.engine('ejs' , engine)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('public', path.join(__dirname, 'public'))
app.use(express.static('public'))



app.get('/about' , (req,res)=>{
    res.render('about');
})

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
app.get('/:id', async (req, res) => {
    try {
        const center = await Center.findById(req.params.id).populate("reviews");
        res.render('center', { center });
    } catch {
        console.log("A problem");
    }
});


app.post('/:id/reviews', async (req, res) => {
    const center = await Center.findById(req.params.id);
    const review = new Review(req.body.review);
    center.reviews.push(review);
    await review.save();
    await center.save();
    res.redirect(`/${center._id}`);
})

app.delete('/:id/reviews/:reviewId', async (req, res) => {
    const { id, reviewId } = req.params;
    const id2 = await Center.findById(id);
    console.log(id2.reviews);
    // console.log(id2);
    await Center.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/${id}`);
})

















app.listen(3000, () => {
    console.log('Serving on port 3000')
})