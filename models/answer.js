const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer: {
        type: String,
        required: true,
    }
    ,
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    ,
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }
});

module.exports = mongoose.model("Answer", answerSchema);