const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportAnswerSchema = new Schema({
    type: {
        type: String,
        required: true,
    }
    ,
    answer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }
});

module.exports = mongoose.model("ReportAnswer", reportAnswerSchema);