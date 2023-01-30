const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
userSchema.plugin(AutoIncrement, {inc_field:'id'});

module.exports = mongoose.model("Users", userSchema)