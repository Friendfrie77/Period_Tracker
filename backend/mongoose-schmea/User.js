const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = 13;
const moment = require("moment");
const { UserPage } = require("twilio/lib/rest/conversations/v1/user");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  notification: {
    type: Boolean,
    default: false,
  },
  number: String,
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

userSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(this.password, salt, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.methods.authPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

userSchema.methods.hashNewPass = function (password) {
  const newPassword = bcrypt.hash(password, salt);
  return newPassword;
};
// Setting users period info
//sorting user prev period
userSchema.methods.sortPrevPeriod = function(user){
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
  console.log(user.previousPeriod)
}
//Calculating the avg length of cycle and period
userSchema.methods.calcAvgLength = function (user) {
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
    if(cycleCount > 0 && totalCycle > 0){
      const cycle = Math.round(totalCycle / cycleCount);
      user.cycle = cycle;
      return {avgLength, cycle };
    }else{
      return{avgLength}
    }
  }
};

//Estimating Dates of period
userSchema.methods.estimateDate = function (user) {
  if (user.cycle > 0) {
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
        lastPeriod = moment(lastPeriod).format();
        startDate = moment(lastPeriod).add(user.cycle, "days");
        endDate = moment(startDate).add(user.avgLength, "days");
      }
      console.log(startDate, endDate);
      user.periodStartDate = startDate;
      user.periodEndDate = endDate;
    }
  } else {
    return false;
  }
};

// //checking if user period is less than x days from period
userSchema.methods.daysTillBlood = function (user) {
  if (user.periodStartDate) {
    let daysTill;
    const todaysDate = new Date();
    daysTill = moment(user.periodStartDate).diff(todaysDate, "days");
    user.daysTill = daysTill;
  } else {
    return false;
  }
};

// //sending user info after login
userSchema.methods.sendUserInfo = function (user) {
  userSchema.methods.sortPrevPeriod(user);
  if (user.periodStartDate || user.periodEndDate == null) {
    userSchema.methods.calcAvgLength(user);
    userSchema.methods.estimateDate(user);
  }
  userSchema.methods.daysTillBlood(user);
  user.save();
  const userInfo = {
    email: user.email,
    username: user.username,
    role: user.role,
    notification: user.notification,
    cycle: user.cycle,
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
userSchema.methods.calcCycleInfo = function (user){
  userSchema.methods.calcAvgLength(user);
  userSchema.methods.estimateDate(user);
  userSchema.methods.daysTillBlood(user);
  const periodInfo = {
    avgLength: user.avgLength,
    cycle: user.cycle,
    periodStartDate: user.periodStartDate,
    periodEndDate: user.periodEndDate,
    daysTill: user.daysTill
  }
  return periodInfo;
}


module.exports = mongoose.model("Users", userSchema);
