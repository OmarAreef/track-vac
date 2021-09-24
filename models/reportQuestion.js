const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportQuestionSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['spam', 'inappropriate', 'harassment']
    }
    ,
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }
});

module.exports = mongoose.model("ReportQuestion", reportQuestionSchema);