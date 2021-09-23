const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Center = require('./models/center');
const Review = require('./models/review');
const Question = require('./models/question');
const Day = require('./models/day');
const Answer = require('./models/answer');
const User = require('./models/user');
const ReportReview = require('./models/reportReview');
const ReportAnswer = require('./models/reportAnswer');
const ReportQuestion = require('./models/reportQuestion');
const session = require('express-session');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const flash = require('connect-flash');
const { isLoggedIn, isReviewAuthor, validateReview, validateAnswer, validateQuestion, adminIsLoggedIn } = require('./middleware');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Admin = require('./models/admin');
const user = require('./models/user');




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


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());



app.engine('ejs', engine)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('public', path.join(__dirname, 'public'))
app.use(express.static('public'))

app.use(flash());
app.use(function (req, res, next) {
    res.locals.user = req.session.userId;
    res.locals.admin = req.user;
    res.locals.userType = req.session.userType;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/faq', (req, res) => {
    res.render('faq');
})




app.get('/', catchAsync(async (req, res) => {
    const { governorate, district, name } = req.query;
    var districts = [];
    var centers = [];
    const governorates = await Center.distinct("governorate");

    if (governorate && district && name) {
        const centerHelper = await Center.find({ governorate, district, name });
        const districts = await Center.find({ governorate }).distinct('district');
        const centers = await Center.find({ governorate, district }).distinct('name');


        res.render('Homepage', { centerHelper, governorates, governorate, district, name, districts, centers });

        // console.log("1");
    } else if (governorate && district) {
        const centerHelper = await Center.find({ governorate, district });
        const districts = await Center.find({ governorate }).distinct('district');
        const centers = await Center.find({ governorate, district }).distinct('name');

        res.render('Homepage', { centers, centerHelper, name, governorates, governorate, district, districts });
        // console.log("2");
    }
    else if (governorate) {
        const centerHelper = await Center.find({ governorate });
        const districts = await Center.find({ governorate }).distinct('district');

        res.render('Homepage', { districts, centerHelper, name, governorate, centers, governorates, district });
        // console.log("3");
    }
    else {
        const centerHelper = await Center.find({});;
        res.render('Homepage', { governorates, district, centerHelper, name, governorate: 'All', districts, centers });
        // console.log("4");
    }
}))
app.get('/centers/logout', isLoggedIn, catchAsync(async (req, res) => {
    req.session.destroy();
    console.log(req.baseUrl, res.baseUrl)
    res.redirect('/')
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
    review.center_id = req.params.id;
    review.author_id = req.session.userId;
    center.reviews.push(review);
    await review.save();
    await center.save();
    res.redirect(`/${center._id}`);
}))

app.delete('/:id/reviews/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Center.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await ReportReview.deleteMany({ review_id: reviewId });
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
        await ReportAnswer.deleteMany({ answer_id: answer });
        await Answer.findByIdAndDelete(answer);
    }
    await ReportQuestion.deleteMany({ question_id: questionId });
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


app.delete('/admin/allreviews/:reviewId', adminIsLoggedIn, catchAsync(async (req, res) => {
    const { reviewId } = req.params;
    console.log(reviewId);
    const review = await Review.findById(reviewId);
    await ReportReview.deleteMany({ review_id: reviewId });
    console.log(review.center_id);
    await Center.findByIdAndUpdate(review.center_id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect('/admin/allreviews');
}));

app.delete('/admin/allquestions/:centerId/:questionId', adminIsLoggedIn, catchAsync(async (req, res) => {
    const { questionId, centerId } = req.params;
    console.log(questionId);
    const question = await Question.findById(questionId);
    await Center.findByIdAndUpdate(centerId, { $pull: { questions: questionId } });
    for (let answer of question.answers) {
        await Answer.findByIdAndDelete(answer);
        await ReportAnswer.deleteMany({ answer_id: answer });
    }
    await ReportQuestion.deleteMany({ question_id: questionId });
    await Question.findByIdAndDelete(question);
    res.redirect('/admin/allreviews');
}));

app.delete('/admin/allcenters/:centerId', adminIsLoggedIn, catchAsync(async (req, res) => {
    const { centerId } = req.params;
    const center = await Center.findById(centerId).populate("questions");
    for (let question of center.questions) {
        for (let answer of question.answers) {
            await Answer.findByIdAndDelete(answer);
            await ReportAnswer.deleteMany({ answer_id: answer });
        }
        await Question.findByIdAndDelete(question._id);
    }
    for (let review of center.reviews) {
        await Review.findByIdAndDelete(review);
        await ReportReview.deleteMany({ review_id: review });
    }
    for (let day of center.workingHours) {
        await Day.findByIdAndDelete(day);
    }
    await Center.findByIdAndDelete(centerId);
    res.redirect('/admin/allreviews');
}));

app.put('/admin/editcenter/:centerId', adminIsLoggedIn, catchAsync(async (req, res) => {
    const { centerId } = req.params;
    const { sunFrom, sunTo, monFrom, monTo, tueFrom, tueTo, wedFrom, wedTo, thuFrom, thuTo, friFrom, friTo, satFrom, satTo } = req.body;
    const center = await Center.findByIdAndUpdate(centerId, { ...req.body.center }).populate("workingHours");
    for (let day of center.workingHours) {
        if (day.day === "sun") {
            await Day.findByIdAndUpdate(day._id, { From: sunFrom, To: sunTo });
        }
        else
            if (day.day === "mon") {
                await Day.findByIdAndUpdate(day._id, { From: monFrom, To: monTo });
            }
            else
                if (day.day === "tue") {
                    await Day.findByIdAndUpdate(day._id, { From: tueFrom, To: tueTo });
                }
                else
                    if (day.day === "wed") {
                        await Day.findByIdAndUpdate(day._id, { From: wedFrom, To: wedTo });
                    }
                    else
                        if (day.day === "thu") {
                            await Day.findByIdAndUpdate(day._id, { From: thuFrom, To: thuTo });
                        }
                        else
                            if (day.day === "fri") {
                                await Day.findByIdAndUpdate(day._id, { From: friFrom, To: friTo });
                            }
                            else
                                if (day.day === "sat") {
                                    await Day.findByIdAndUpdate(day._id, { From: satFrom, To: satTo });
                                }
    }
    res.redirect(`/admin/allreviews`);
}));

app.delete('/:id/:question/:answer', isLoggedIn, catchAsync(async (req, res) => {
    const { id, answer, question } = req.params;
    await Question.findByIdAndUpdate(question, { $pull: { answers: answer } });
    await ReportAnswer.deleteMany({ answer_id: answer });
    await Answer.findByIdAndDelete(answer);
    res.redirect(`/${id}`);
}))



app.put('/:id/:question/:answerId', isLoggedIn, validateAnswer, catchAsync(async (req, res) => {
    const { id, answerId } = req.params;
    await Answer.findByIdAndUpdate(answerId, { answer: req.body.answer.answer });
    res.redirect(`/${id}`);
}));

app.get('/admin/login', (req, res) => {
    res.render('adminlogin');
})
app.get('/admin/home', adminIsLoggedIn, async (req, res) => {
    const reviewReports = await ReportReview.find().populate("review_id");
    const answerReports = await ReportAnswer.find().populate("answer_id");
    const questionReports = await ReportAnswer.find().populate("question_id");
    res.render('adminhome', { reviewReports, answerReports, questionReports });
})

app.get('/admin/addadmin', adminIsLoggedIn, (req, res) => {
    res.render('addadmin');
})

app.get('/admin/editcenter', adminIsLoggedIn, async (req, res) => {
    const { centerId } = req.query;
    if (centerId) {
        const center = await Center.findById(centerId).populate("workingHours");
        console.log(center);
        console.log(center.workingHours);
        let sun, mon, tue, wed, thu, fri, sat;
        for (let day of center.workingHours) {
            if (day.day === "sun") {
                sun = await Day.findById(day._id);
            }
            else
                if (day.day === "mon") {
                    mon = await Day.findById(day._id);
                }
                else
                    if (day.day === "tue") {
                        tue = await Day.findById(day._id);
                    }
                    else
                        if (day.day === "wed") {
                            wed = await Day.findById(day._id);
                        }
                        else
                            if (day.day === "thu") {
                                thu = await Day.findById(day._id);
                            }
                            else
                                if (day.day === "fri") {
                                    fri = await Day.findById(day._id);
                                }
                                else
                                    if (day.day === "sat") {
                                        sat = await Day.findById(day._id);
                                    }
        }
        res.render('editcenter', { center, sun, mon, tue, wed, thu, fri, sat });
    }
    else {
        res.redirect("/admin/allreviews");
    }
})

app.post('/admin/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/admin/login' }), async (req, res) => {
    req.session.adminId = req.user._id;
    res.redirect('/admin/home');
})

app.post('/admin/addadmin', adminIsLoggedIn, async (req, res) => {
    try {
        const { email, username, password, role } = req.body;
        const user = new Admin({ email, username, role });
        const registeredUser = await Admin.register(user, password);
        req.flash('success', "Admin Added Succesfully");
        res.redirect('/admin/addadmin');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/admin/addadmin');
    }
})

app.get('/admin/resetpassword', (req, res) => {
    res.render('resetpassword');
})

app.post('/admin/resetpassword', adminIsLoggedIn, async (req, res) => {
    const admin = req.user;
    admin.changePassword(req.body.oldpassword, req.body.newpassword, (err) => {
        if (err) {
            req.flash('error', "Password not changed")
            res.redirect('/admin/resetpassword');
        }
        else {
            req.flash('success', "Password changed successfully");
            res.redirect('/admin/resetpassword');
        }

    })
})

app.get('/admin/logout', (req, res) => {
    req.logout();
    res.redirect('/admin/login');
})

app.post('/:id/:review/reportReview', catchAsync(async (req, res) => {
    const center = await Center.findById(req.params.id);
    const report = new ReportReview({ type: req.body.reportReview });
    report.review_id = req.params.review;
    await report.save();
    res.redirect(`/${center._id}`);
}))

app.post('/:id/:answer/reportAnswer', catchAsync(async (req, res) => {
    const center = await Center.findById(req.params.id);
    const report = new ReportAnswer({ type: req.body.reportAnswer });
    report.answer_id = req.params.answer;
    await report.save();
    res.redirect(`/${center._id}`);
}))

app.post('/:id/:question/reportQuestion', catchAsync(async (req, res) => {
    const center = await Center.findById(req.params.id);
    const report = new ReportQuestion({ type: req.body.reportQuestion });
    report.question_id = req.params.question;
    await report.save();
    res.redirect(`/${center._id}`);
}))

app.post("/acceptReview/:report/:review", catchAsync(async (req, res) => {
    const { review } = req.params;
    await Review.findByIdAndDelete(review);
    await ReportReview.deleteMany({ review_id: review });
    res.redirect("/admin/home");
}))

app.post("/rejectReview/:report/:review", catchAsync(async (req, res) => {
    const { report } = req.params;
    await ReportReview.findByIdAndDelete(report);
    res.redirect("/admin/home");
}))

app.post("/acceptQuestion/:report/:question", catchAsync(async (req, res) => {
    const { question } = req.params;
    const questionBody = await Question.findById(question);
    await Center.findByIdAndUpdate(id, { $pull: { questions: question } });
    for (let answer of questionBody.answers) {
        await ReportAnswer.deleteMany({ answer_id: answer });
        await Answer.findByIdAndDelete(answer);
    }
    await ReportQuestion.deleteMany({ question_id: question });
    await Question.findByIdAndDelete(question);
    res.redirect("/admin/home");
}))

app.post("/rejectQuestion/:report/:question", catchAsync(async (req, res) => {
    const { report } = req.params;
    await ReportQuestion.findByIdAndDelete(report);
    res.redirect("/admin/home");
}))

app.post("/acceptAnswer/:report/:answer", catchAsync(async (req, res) => {
    const { answer } = req.params;
    await Answer.findByIdAndDelete(answer);
    await ReportAnswer.deleteMany({ answer_id: answer });
    res.redirect("/admin/home");
}))

app.post("/rejectAnswer/:report/:answer", catchAsync(async (req, res) => {
    const { report } = req.params;
    await ReportAnswer.findByIdAndDelete(report);
    res.redirect("/admin/home");
}))

app.get('/admin/allreviews', adminIsLoggedIn, catchAsync(async (req, res) => {
    const { governorate, district, name } = req.query;
    var districts = [];
    var centers = [];
    const governorates = await Center.distinct("governorate");
    if (governorate && district && name) {
        const centerHelper = await Center.find({ governorate, district, name }).populate({
            path: "reviews"
            ,
            populate: {
                path: "center_id"
            }
        }).populate({
            path: "reviews"
            ,
            populate: {
                path: "author_id"
            }
        }).populate({
            path: "questions"
            ,
            populate: {
                path: "author_id"
            }
        }).populate({
            path: "questions"
            ,
            populate: {
                path: "answers"
            }
        }).populate("workingHours");
        const districts = await Center.find({ governorate }).distinct('district');
        const centers = await Center.find({ governorate, district }).distinct('name');
        let reviewHelper = [];
        for (let center of centerHelper) {
            for (let review of center.reviews) {
                reviewHelper.push(review);
            }
        }
        console.log(reviewHelper);
        res.render('allreviews', { centerHelper, governorates, governorate, district, name, districts, centers, reviewHelper });
    } else if (governorate && district) {
        const centerHelper = await Center.find({ governorate, district }).populate({
            path: "reviews"
            ,
            populate: {
                path: "center_id"
            }
        }).populate({
            path: "reviews"
            ,
            populate: {
                path: "author_id"
            }
        }).populate({
            path: "questions"
            ,
            populate: {
                path: "author_id"
            }
        }).populate({
            path: "questions"
            ,
            populate: {
                path: "answers"
            }
        }).populate("workingHours");
        const districts = await Center.find({ governorate }).distinct('district');
        const centers = await Center.find({ governorate, district }).distinct('name');
        let reviewHelper = [];
        for (let center of centerHelper) {
            for (let review of center.reviews) {
                reviewHelper.push(review);
            }
        }
        console.log(reviewHelper);
        res.render('allreviews', { centers, centerHelper, name, governorates, governorate, district, districts, reviewHelper });
    }
    else if (governorate) {
        const centerHelper = await Center.find({ governorate }).populate({
            path: "reviews"
            ,
            populate: {
                path: "center_id"
            }
        }).populate({
            path: "reviews"
            ,
            populate: {
                path: "author_id"
            }
        }).populate({
            path: "questions"
            ,
            populate: {
                path: "author_id"
            }
        }).populate({
            path: "questions"
            ,
            populate: {
                path: "answers"
            }
        }).populate("workingHours");
        const districts = await Center.find({ governorate }).distinct('district');
        let reviewHelper = [];
        for (let center of centerHelper) {
            for (let review of center.reviews) {
                reviewHelper.push(review);
            }
        }
        res.render('allreviews', { districts, centerHelper, name, governorate, centers, governorates, district, reviewHelper });
    }
    else {
        const reviewHelper = await Review.find({}).populate("author_id").populate({
            path: "center_id"
            ,
            populate: {
                path: "questions"
                ,
                populate: {
                    path: "answers"
                }
            }
        }).populate({
            path: "center_id"
            ,
            populate: {
                path: "questions"
                ,
                populate: {
                    path: "author_id"
                }
            }
        });
        const centerHelper = await Center.find({}).populate({
            path: "reviews"
            ,
            populate: {
                path: "center_id"
            }
        }).populate({
            path: "reviews"
            ,
            populate: {
                path: "author_id"
            }
        }).populate({
            path: "questions"
            ,
            populate: {
                path: "author_id"
            }
        }).populate({
            path: "questions"
            ,
            populate: {
                path: "answers"
            }
        }).populate("workingHours");
        res.render('allreviews', { centerHelper, governorates, district, name, governorate: 'All', districts, centers, reviewHelper });
    }
}));

app.get('/admin/addcenter', adminIsLoggedIn, (req, res) => {

    res.render('addcenter');
})

app.post('/admin/addcenter', adminIsLoggedIn, async (req, res) => {
    const { sunFrom, sunTo, monFrom, monTo, tueFrom, tueTo, wedFrom, wedTo, thuFrom, thuTo, friFrom, friTo, satFrom, satTo } = req.body;
    const sun = new Day({ day: 'sun', From: sunFrom, To: sunTo });
    const mon = new Day({ day: 'mon', From: monFrom, To: monTo });
    const tue = new Day({ day: 'tue', From: tueFrom, To: tueTo });
    const wed = new Day({ day: 'wed', From: wedFrom, To: wedTo });
    const thu = new Day({ day: 'thu', From: thuFrom, To: thuTo });
    const fri = new Day({ day: 'fri', From: friFrom, To: friTo });
    const sat = new Day({ day: 'sat', From: satFrom, To: satTo });
    const center = new Center(req.body.center);
    center.workingHours = [sun, mon, tue, wed, thu, fri, sat];
    await sun.save();
    await mon.save();
    await tue.save();
    await wed.save();
    await thu.save();
    await fri.save();
    await sat.save();
    await center.save();
    req.flash('success', 'Successfully made a new Center!');
    res.redirect("/admin/addcenter");
})
app.get('/:id', catchAsync(async (req, res) => {


    const center = await Center.findById(req.params.id)
        .populate("workingHours")
        .populate("reviews")
        .populate({
            path: 'questions',
            populate: {
                path: 'answers'
            }
        })

    console.log(center);
    res.render('center', { center });

}));

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {

    console.log('Serving on port 3000')

})