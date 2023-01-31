const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');
const salt = 15;
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    }, 
    username: String,
    password: String,
    accessToken: String,
    cycle: Number,
    periodStartDate: Date,
    periodEndDate: Date,
    previousPeriod:{
        startDate: Date,
        endDate: Date
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
userSchema.plugin(AutoIncrement, {inc_field:'id'});

module.exports = mongoose.model("Users", userSchema)