const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    }
    ,
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
    ,
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ]
});

module.exports = mongoose.model("Question", questionSchema);