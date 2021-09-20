const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');



const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role : {
        type: String,
        enum: ['Moderator', 'Admin'],
        default: 'Admin'
    }
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin', UserSchema);