const Center = require('./models/center');
const Review = require('./models/review');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    const { id } = req.params;
    if (!req.session.userId) {
        console.log("Error Logging In");
        req.flash('error', 'You must be signed in first!');
        return res.redirect(`/${id}`);
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

