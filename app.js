const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Center = require('./models/center');
const Review = require('./models/review');
const User = require('./models/user');
const session = require('express-session');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');




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
app.use(express.static('public'))

const TWO_HOURS =1000 * 60 * 60 *2
const{
  PORT=3000,
  NODE_ENV='development',
  SESS_Name='sid',
  SESS_SECRET ='secret',
  SESS_LIFE=TWO_HOURS

}= process.env

const IN_PROD =NODE_ENV==='production'

app.use(session({
    name:SESS_Name,
    saveUninitialized: false,
    resave:false,
    secret: SESS_SECRET,
    cookie: { maxAge: 3600000,secure: false, httpOnly: true }
  
  })
)

app.use(function(req, res, next) {
    res.locals.user = req.session.userId;
    next();
  });



app.engine('ejs' , engine)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('public', path.join(__dirname, 'public'))



app.get('/', catchAsync(async (req, res) => {

    const { governorate, district, name } = req.query;
    var districts = [];
    var centers = [];
    const governorates = await Center.distinct("governorate");

    if (governorate && district && name) {
        const centerHelper = await Center.find({ governorate, district, name });
        const districts = await Center.find({ governorate }).distinct('district');
        const centers = await Center.find({ governorate, district }).distinct('name');
        res.render('home', { centerHelper, governorates, governorate, district, name, districts, centers });

    } else if (governorate && district) {
        const centerHelper = await Center.find({ governorate, district });
        const districts = await Center.find({ governorate }).distinct('district');
        const centers = await Center.find({ governorate, district }).distinct('name');
        res.render('home', { centers, centerHelper, name, governorates, governorate, district, districts });

    }
    else if (governorate) {
        const centerHelper = await Center.find({ governorate });
        const districts = await Center.find({ governorate }).distinct('district');
        res.render('home', { districts, centerHelper, name, governorate, centers, governorates, district });
    }
    else {
        const centerHelper = await Center.find({});;
        res.render('home', { governorates, district, centerHelper, name, governorate: 'All', districts, centers });
    }

}))

app.get('/:id', catchAsync(async (req, res) => {
    const center = await Center.findById(req.params.id).populate("reviews");
    res.render('center', {center});
}));

app.get('/centers/logout', catchAsync(async (req, res)=>{
    req.session.destroy();
    res.redirect('/')
}));


app.post("/:id/login", catchAsync(async (req, res) => {
    var Ireg_num = req.body.username;
    var Ipass = req.body.password;
    var flag = false;
    if (Ireg_num === "" || Ipass === "") {
        res.redirect('/'+req.params.id);
    }
    const user = await User.findOne({reg_num: Ireg_num,pass :Ipass});
    if (user) { 
        req.session.userId=user._id;      
        flag = true;
        res.redirect('/'+req.params.id);  
    }        
    if(!flag){
        res.redirect('/'+req.params.id);  
    }  
  }));

app.post('/:id/reviews',catchAsync(async (req, res) => {
    const center = await Center.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author_id=req.session.userId;
    center.reviews.push(review);
    await review.save();
    await center.save();
    res.redirect(`/${center._id}`);
}))

app.delete('/:id/reviews/:reviewId', catchAsync(async (req, res)=> {
    const { id, reviewId } = req.params;
    const id2 = await Center.findById(id);
    await Center.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/${id}`);
}))
app.put('/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndUpdate(reviewId, { ...req.body.review });
    console.log(req.body.review);
    res.redirect(`/${id}`);
}));

app.get('/about' , catchAsync(async (req, res)=>{
    res.render('about');
}));


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})  


app.listen(3000, () => {
    console.log('Serving on port 3000')
})