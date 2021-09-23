const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportAnswerSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum : ['spam' , 'inappropriate' , 'harassment']
    }
    ,
    answer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }
});

module.exports = mongoose.model("ReportAnswer", reportAnswerSchema);