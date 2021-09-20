const Center = require('./models/center');
const Review = require('./models/review');
const ExpressError = require('./utils/ExpressError');
const { reviewSchema, questionSchema, answerSchema } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    const { id } = req.params;
    if (!req.session.userId) {
        console.log("Error Logging In");
        req.flash('error', 'You must be signed in first!');
        return res.redirect(`/${id}`);
    }
    next();
}
module.exports.adminIsLoggedIn = (req, res, next) => {
    if (!req.session.adminId) {
        console.log("Error Logging In");
        req.flash('error', 'You must be signed in first!');
        return res.redirect(`/admin/login`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author_id.equals(req.session.userId)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/${id}`);
    }
    next();
}


// module.exports.validateCenter = (req, res, next) => {
//     console.log(req.body);
//     const { error } = centerSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateAnswer = (req, res, next) => {
    const { error } = answerSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateQuestion = (req, res, next) => {
    const { error } = questionSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

