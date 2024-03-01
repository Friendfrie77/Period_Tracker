const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcrypt');
const salt = 13;

const demoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    cycle: Number,
    avgLength: Number,
    periodStartDate: {
        type: Date,
        default: null,
      },
    periodEndDate: {
    type: Date,
    default: null,
    },
    daysTill: {
    type: Number,
    default: null,
    },
    canBleed: {
    type: Boolean,
    default: false,
    },
    isBleeding: {
    type: Boolean,
    default: false,
    },
    previousPeriod: {
    type: Array,
    default: [],
    },
});

demoSchema.pre('save', function(next){
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

demoSchema.methods.authPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

demoSchema.methods.hashNewPass = function(password){
    const newPassword = bcrypt.hash(password, salt);
    return(newPassword)
}


//sorting user prev period
demoSchema.methods.sortPrevPeriod = function(user){
  let sorted = true
  for(let i = 0; i < user.previousPeriod.length -1; i++){
    if(user.previousPeriod[i][0] > user.previousPeriod[i + 1 ][0]){
      sorted = false;
      break;
    }
  }
  if(!sorted){
    sortedPeriod = user.previousPeriod.sort((a,b) => a[0] - b[0]);
    user.previousPeriod = sortedPeriod;
  }
}

demoSchema.methods.calcAvgLength = function (user) {
  user.cycle = 0;
  user.avgLength = 0;
  if (user.previousPeriod.length <= 1) {
    return false;
  } else {
    let totalDays = 0;
    let totalCycle = 0;
    let oldStartDate = null;
    let cycleCount = 0;
    user.previousPeriod.forEach((date) => {
      totalDays += moment(date.endDate).diff(date.startDate, "days");
      if (oldStartDate != null) {
        const monthDif = moment(oldStartDate).diff(date.startDate, "month", true);
        if (Math.abs(monthDif) < 1.5) {
          totalCycle += Math.abs(moment(date.startDate).diff(oldStartDate, "days"));
          cycleCount += 1;
        }
      } else {
        oldStartDate = moment(date.startDate);
      }
    });
    const avgLength = Math.round(totalDays / user.previousPeriod.length);
    console.log(avgLength)
    if(cycleCount > 0 && totalCycle > 0){
      const cycle = Math.round(totalCycle / cycleCount);
      user.cycle = cycle;
      user.avgLength = avgLength;
    }else{
      user.avgLength = avgLength;
    }
  }
};

//Estimating Dates of period
demoSchema.methods.estimateDate = function (user) {
    if (user.previousPeriod.length > 0) {
      let lastPeriod, startDate, endDate;
      let todaysDate = new Date();
      if (!user.periodStartDate || !user.periodEndDate) {
        user.previousPeriod.forEach((date) => {
          if (lastPeriod === null) {
            lastPeriod = date.startDate;
          } else if (lastPeriod < date.startDate) {
            lastPeriod = date.startDate;
          }
        });
        const monthDif = moment(todaysDate).diff(lastPeriod, "month");
        if (monthDif > 1) {
          const estimateLastPeriod = moment(lastPeriod).add(monthDif, "months");
          startDate = moment(estimateLastPeriod).add(user.cycle, "days");
          endDate = moment(startDate).add(user.avgLength, "days");
        } else {
          lastPeriod = moment(lastPeriod);
          startDate = moment(lastPeriod).add(user.cycle, "days");
          endDate = moment(startDate).add(user.avgLength, "days");
        }
        user.periodStartDate = startDate.format('YYYY-MM-DD');
        user.periodEndDate = moment(endDate).format('YYYY-MM-DD');
      }
    } else {
      return false;
    }
  };

//checking if user period is less than x days from period
demoSchema.methods.daysTillBlood = function (user) {
    if (user.periodStartDate) {
      let daysTill;
      const todaysDate = new Date();
      daysTill = moment(user.periodStartDate).diff(todaysDate, "days");
      user.daysTill = daysTill;
    } else {
      return false;
    }
  };
  

//sending user infor after login
demoSchema.methods.sendUserInfo = function (user) {
    if (user.periodStartDate || user.periodEndDate == null) {
      demoSchema.methods.calcAvgLength(user);
      demoSchema.methods.estimateDate(user);
    }
    demoSchema.methods.daysTillBlood(user);
    user.save();
    const userInfo = {
      username: user.username,
      cycle: user.cycle,
      role: user.role,
      avgLength: user.avgLength,
      periodStartDate: user.periodStartDate,
      periodEndDate: user.periodEndDate,
      daysTill: user.daysTill,
      canBleed: user.canBleed,
      isBleeding: user.isBleeding,
      previousPeriod: user.previousPeriod,
    };
    return userInfo;
  };
  //Updates cycle info on change of info
demoSchema.methods.calcCycleInfo = function (user){
  demoSchema.methods.calcAvgLength(user);
  demoSchema.methods.estimateDate(user);
  demoSchema.methods.daysTillBlood(user);
  user.save();
  const periodInfo = {
    avgLength: user.avgLength,
    cycle: user.cycle,
    periodStartDate: user.periodStartDate,
    periodEndDate: user.periodEndDate,
    daysTill: user.daysTill
  }
  return periodInfo;
}


module.exports = mongoose.model("Demo", demoSchema)