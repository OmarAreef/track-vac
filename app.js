const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Center = require('./models/center');
const Review = require('./models/review');
const Question = require('./models/question');
const Answer = require('./models/answer');
const User = require('./models/user');
const session = require('express-session');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const flash = require('connect-flash');
const { isLoggedIn, isReviewAuthor, validateReview, validateAnswer, validateQuestion } = require('./middleware');




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

const TWO_HOURS = 1000 * 60 * 60 * 2
const {
    PORT = 3000,
    NODE_ENV = 'development',
    SESS_Name = 'sid',
    SESS_SECRET = 'secret',
    SESS_LIFE = TWO_HOURS

} = process.env

const IN_PROD = NODE_ENV === 'production'


app.use(session({
    name: SESS_Name,
    saveUninitialized: false,
    resave: false,
    secret: SESS_SECRET,
    cookie: { maxAge: 3600000, secure: false, httpOnly: true }
}))

app.engine('ejs', engine)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('public', path.join(__dirname, 'public'))
app.use(express.static('public'))

app.use(flash());
app.use(function (req, res, next) {
    res.locals.user = req.session.userId;
    res.locals.userType = req.session.userType;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/faq' , (req,res)=>{
    res.render('faq');
})

app.get('/center', catchAsync(async (req, res) => {
    const { governorate, district, name } = req.query;
    var districts = [];
    var centers = [];
    const governorates = await Center.distinct("governorate");

    if (governorate && district && name) {
        const centerHelper = await Center.find({ governorate, district, name });
        const districts = await Center.find({ governorate }).distinct('district');
        const centers = await Center.find({ governorate, district }).distinct('name');


        res.render('Homepage', { centerHelper, governorates, governorate, district, name, districts, centers });

        console.log("1");
    } else if (governorate && district) {
        const centerHelper = await Center.find({ governorate, district });
        const districts = await Center.find({ governorate }).distinct('district');
        const centers = await Center.find({ governorate, district }).distinct('name');

        res.render('Homepage', { centers, centerHelper, name, governorates, governorate, district, districts });
        console.log("2");
    }
    else if (governorate) {
        const centerHelper = await Center.find({ governorate });
        const districts = await Center.find({ governorate }).distinct('district');

        res.render('Homepage', { districts, centerHelper, name, governorate, centers, governorates, district });
        console.log("3");
    }
    else {
        const centerHelper = await Center.find({});;
        res.render('Homepage', { governorates, district, centerHelper, name, governorate: 'All', districts, centers });
        console.log("4");
    }
}))

app.get('/:id', catchAsync(async (req, res) => {
    const center = await Center.findById(req.params.id).populate("reviews").populate({
        path: 'questions',
        populate: {
            path: 'answers'
        }
    });
    res.render('center', { center });

   
}));

app.get('/centers/logout', isLoggedIn, catchAsync(async (req, res) => {
    req.session.destroy();
    res.redirect('/center')
}));

app.post("/login/:id", catchAsync(async (req, res) => {
    var Ireg_num = req.body.username;
    var Ipass = req.body.password;
    if (Ireg_num === "" || Ipass === "") {
        if (req.params.id === 'undefined') {
            res.redirect('/');
        }
        else {
            res.redirect('/' + req.params.id);
        }
        return;
    }
    const user = await User.findOne({ reg_num: Ireg_num, pass: Ipass });
    if (user) {

        if (req.params.id === 'undefined') {
            req.session.userId = user._id;
            req.session.userType = user.userType;
            res.redirect('/');
        }
        else {
            req.session.userId = user._id;
            req.session.userType = user.userType;
            res.redirect('/' + req.params.id);
        }
    }
    else {
        if (req.params.id === 'undefined') {
            //req.flash('error', 'you are not registered');
            res.redirect('/');
        }
        else {
            //req.flash('error', 'you are not registered');
            res.redirect('/' + req.params.id);
        }
    }

}));

app.post('/:id/reviews', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const center = await Center.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author_id = req.session.userId;
    center.reviews.push(review);
    await review.save();
    await center.save();
    res.redirect(`/${center._id}`);
}))

app.delete('/:id/reviews/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Center.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/${id}`);
}))

app.put('/:id/reviews/:reviewId', isLoggedIn, isReviewAuthor, validateReview, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndUpdate(reviewId, { ...req.body.review });
    res.redirect(`/${id}`);
}));

app.get('/about', catchAsync(async (req, res) => {
    res.render('about');
}));

app.post('/:id/addQuestion', isLoggedIn, validateQuestion, catchAsync(async (req, res) => {
    const center = await Center.findById(req.params.id);
    const question = new Question({ question: req.body.question.question });
    question.author_id = req.session.userId;
    center.questions.push(question);
    await question.save();
    await center.save();
    res.redirect(`/${center._id}`);
}))

app.put('/:id/:question', isLoggedIn, validateQuestion, catchAsync(async (req, res) => {
    const { id, question } = req.params;
    await Question.findByIdAndUpdate(question, { question: req.body.question.question });
    res.redirect(`/${id}`);
}));

app.delete('/:id/:question', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const questionId = req.params.question;
    const question = await Question.findById(questionId);
    await Center.findByIdAndUpdate(id, { $pull: { questions: questionId } });
    for (let answer of question.answers) {
        await Answer.findByIdAndDelete(answer);
    }
    await Question.findByIdAndDelete(question);
    res.redirect(`/${id}`);
}))

app.post('/:id/:question/addAnswer', isLoggedIn, validateAnswer, catchAsync(async (req, res) => {
    const center = await Center.findById(req.params.id);
    const question = await Question.findById(req.params.question);
    const answer = new Answer({ answer: req.body.answer.answer });
    answer.author_id = req.session.userId;
    question.answers.push(answer);
    await answer.save();
    await question.save();
    res.redirect(`/${center._id}`);
}))

app.delete('/:id/:question/:answer', isLoggedIn, catchAsync(async (req, res) => {
    const { id, answer, question } = req.params;
    await Question.findByIdAndUpdate(question, { $pull: { answers: answer } });
    await Answer.findByIdAndDelete(answer);
    res.redirect(`/${id}`);
}))

app.put('/:id/:question/:answerId', isLoggedIn, validateAnswer, catchAsync(async (req, res) => {
    const { id, answerId } = req.params;
    await Answer.findByIdAndUpdate(answerId, { answer: req.body.answer.answer });
    res.redirect(`/${id}`);
}));

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})




app.listen(3000, () => {
    console.log('Serving on port 3000')
})