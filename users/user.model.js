const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const schema = new Schema({
    name: {
        type: String,
        // required: [true, 'Please tell us your name!']
      },
      email: {
        type: String,
        // required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
      },
      phone: {
        type: Number,
        // required: [true, 'Please provide your phone number'],
      },
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    // firstName: { type: String, required: true },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
      },
    // lastName: { type: String, required: true },
    text:{
        type: String
      },
      createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);




