const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportReviewSchema = new Schema({
    type: {
        type: String,
        required: true,
    }
    ,
    review_id: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
});

module.exports = mongoose.model("ReportReview", reportReviewSchema);