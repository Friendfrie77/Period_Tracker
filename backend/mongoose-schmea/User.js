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
    notification:{
        type: Boolean,
        default: false
    },
    number: String,
    cycle: Number,
    avgLength: Number, 
    periodStartDate: Date,
    periodEndDate: Date,
    canBleed:{
        type: Boolean,
        default: false
    },
    isBleeding:{
        type: Boolean,
        default: false
    },
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

userSchema.methods.hashNewPass = function(password){
    const newPassword = bcrypt.hash(password, salt);
    console.log(newPassword)
    return(newPassword)
}

userSchema.methods.sendUserInfo = function(user){
    const userInfo ={
        email: user.email,
        username: user.username,
        notification: user.notification, 
        cycle: user.cycle,
        avgLength: user.avgLength,
        periodStartDate: user.periodStartDate,
        periodEndDate: user.periodEndDate,
        canBleed: user.canBleed,
        isBleeding: user.isBleeding,
        previousPeriod: user.previousPeriod
    }
    return userInfo
}


module.exports = mongoose.model("Users", userSchema)