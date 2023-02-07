const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');
const salt = 13;
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }, 
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: String,
    cycle: Number,
    periodStartDate: Date,
    periodEndDate: Date,
    previousPeriod:{
        type: Array,
        default: []
    }
});

userSchema.pre('save', function(next){
    if (this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(this.password, salt, function(err, hashedPassword){
            if (err){
                next(err);
            } else{
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

userSchema.methods.authPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}


module.exports = mongoose.model("Users", userSchema)