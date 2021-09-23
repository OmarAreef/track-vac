const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema = new Schema({
    day: {
        type: String,
        enum: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        required: true
    },
    From: {
        type: String,
        default: '09:00'

    },
    To: {
        type: String,
        default: '21:00'
    }

});

daySchema.pre('save', function (next) {
    if (this.From === '') {
        this.From = undefined
    }
    if (this.To === '') {
        this.To = undefined
    }

    next();
});

module.exports = mongoose.model('Day', daySchema);