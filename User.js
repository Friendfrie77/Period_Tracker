const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    }, 
    username: String,
    password: String,
    cycle: Number,
    periodStartDate: Date,
    periodEndDate: Date,
    previousPeriod:{
        startDate: Date,
        endDate: Date
    }
})

module.exports = mongoose.model("Users", userSchema)