const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = 13;
const moment = require('moment');

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
    daysTill: Number,
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
// Setting users period info

//Calculating the avg length of cycle and period
userSchema.methods.calcAvgLength = function(user){
    let totalDays = 0;
    let totalCycle = 0;
    let oldStartDate = null;
    let cycleCount = 0;
    if (user.previousPeriod.length <= 1){
        return (false)
    }
    user.previousPeriod.forEach(date => {
        totalDays += moment(date.endDate).diff(date.startDate, 'days')
        if(oldStartDate != null){
            const monthDif = moment(oldStartDate).diff(date.startDate, 'month', true);
            if (Math.abs(monthDif) < 1.5){
                totalCycle += Math.abs(moment(date.startDate).diff(oldStartDate, 'days'))
                cycleCount += 1
            }
        }else{
            oldStartDate = moment(date.startDate);
        }
    });
    const avgLength = (Math.round(totalDays/user.previousPeriod.length));
    const cycle = (Math.round(totalCycle/cycleCount));
    user.cycle = cycle;
    user.avgLength = avgLength;
    return{avgLength, cycle}
}

//Estimating Dates of period
userSchema.methods.estimateDate = function(user){
    let lastPeriod = null;
    let startDate;
    let endDate;
    let todaysDate = new Date();
    if(!user.periodStartDate || !user.periodEndDate){
        user.previousPeriod.forEach(date =>{
            if (lastPeriod === null){
                lastPeriod = date.startDate
            }else if(lastPeriod < date.startDate){
                lastPeriod = date.startDate
            }
        })
        const monthDif = moment(todaysDate).diff(lastPeriod, 'month')
        if (monthDif > 1){
            const estimateLastPeriod = moment(lastPeriod).add((monthDif), 'months');
            startDate = moment(estimateLastPeriod).add(user.cycle, 'days');
            endDate = moment(startDate).add(user.avgLength, 'days');
        }else{
            lastPeriod = moment(lastPeriod).format();
            startDate = moment(lastPeriod).add(user.cycle, 'days');
            endDate = moment(startDate).add(user.avgLength, 'days');
        }
        user.periodStartDate = startDate
        user.periodEndDate = endDate
    }else{
        return(false)
    }
}

//checking if user period is less than x days from period
userSchema.methods.daysTillBlood = function(user){
    let daysTill;
    const todaysDate = new Date();
    daysTill = moment(user.periodStartDate).diff(todaysDate, 'days')
    user.daysTill = daysTill
    console.log(daysTill)
}

//sending user infor after login
userSchema.methods.sendUserInfo = function(user){
    if (user.periodStartDate || user.periodEndDate == null){
        userSchema.methods.calcAvgLength(user)
        userSchema.methods.estimateDate(user)
    }
    userSchema.methods.daysTillBlood(user)
    user.save()
    const userInfo ={
        email: user.email,
        username: user.username,
        notification: user.notification, 
        cycle: user.cycle,
        avgLength: user.avgLength,
        periodStartDate: user.periodStartDate,
        periodEndDate: user.periodEndDate,
        daysTill: user.daysTill,
        canBleed: user.canBleed,
        isBleeding: user.isBleeding,
        previousPeriod: user.previousPeriod
    }
    return userInfo
}


module.exports = mongoose.model("Users", userSchema)