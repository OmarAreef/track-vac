const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    reg_num: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function (val) {
                return val.toString().length === 14
            },
            message: val => `${val.value} has to be 14 digits`
        }
    },
    pass: {
        type: Number,
        required: true,
        validate: {
            validator: function (val) {
                return val.toString().length === 4
            },
            message: val => `${val.value} has to be 4 digits`
        }
    },
    userType: {
        type: String,
        enum: ['notVaccinated', '1stDose', '2ndDose'],
        default: 'notVaccinated'
    }
});

module.exports = mongoose.model("User", userSchema);