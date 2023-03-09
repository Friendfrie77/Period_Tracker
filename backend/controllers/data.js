const User = require('../mongoose-schmea/User');
const moment = require('moment')

const addNewUserInfo = async (req, res) => {
    const {email, userInfo} = req.body;
    const user = await User.findOne({email: email});
    try{
        if(user.previousPeriod.length === 0){
            user.previousPeriod = userInfo;
            user.save()
            res.status(200)
        }else{
            user.previousPeriod = userInfo;
            user.save()
            res.status(200).json('test')
        }
    }catch(err){
        res.status(500).json({
            error: 'Internal error please try again'
        })
    }
}
const getUserInfo = async (req, res) =>{
    const {email} = req.body;
    const user = await User.findOne({email: email});
    try{
        if(user){
            delete user.password;
            res.status(200).json({user})
        }
    }catch(err){
        res.status(500).json({error : err.messege})
    }
}
const addNewPeriod = async (req, res) => {
    const {email, startDate, endDate, cycle, avgLength} = req.body;
    console.log(email, startDate, endDate, cycle, avgLength)
    const user = await User.findOne({email: email});
    try{
        if(user){
            console.log(user)
            user.periodStartDate = moment(startDate).format('YYYY-MM-DD');
            user.periodEndDate = moment(endDate).format('YYYY-MM-DD');
            user.avgLength = avgLength;
            user.cycle = cycle;
            user.save()
            res.status(200).json({user})
        }
    }catch(err){
        res.status(500).json({error : err.messege})
    }
    res.status(200)
}

const setPeriodStatus = async (req, res) =>{
    const {email, isBleeding, canBleed} = req.body;
    const user = await User.findOne({email: email});
    if(user){
        if(canBleed != user.canBleed){
            User.findOneAndUpdate({_id:user._id}, {canBleed:canBleed}).exec();
        }
        if(isBleeding != user.isBleeding){
            User.findOneAndUpdate({_id:user._id}, {isBleeding:isBleeding}).exec();
        }
        user.save()
        res.status(200)
    }else{
        res.status(500).json({messege: 'Internal Server Error'})
    }
}

const updatePeriod = async (req, res) =>{
    const {email, periodStartDate, periodEndDate} = req.body
    console.log(email)
    const user = await User.findOne({email: email});
    console.log(periodStartDate, periodEndDate)
    try{
        if(user.periodStartDate != periodStartDate){
            User.findOneAndUpdate({_id:user._id}, {periodStartDate:periodStartDate}).exec();
        }
        if(user.periodEndDate != periodEndDate){
            User.findOneAndUpdate({_id:user._id}, {periodEndDate:periodEndDate}).exec();
        }
        User.findByIdAndUpdate({_id:user._id},{isBleeding:true}).exec();
        User.findByIdAndUpdate({_id:user._id},{canBleed:false}).exec();
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({error: err.messege})
    }
}

const addPreviousPeriod = async (req, res) =>{
    const {email, previousPeriod} = req.body;
    const user = await User.findOne({email: email});
    try{
        user.previousPeriod = previousPeriod;
    }catch(err){
        res.status(500).json({error: err.messege})
    }
}
module.exports = {addNewUserInfo, addNewPeriod,getUserInfo, setPeriodStatus, addPreviousPeriod, updatePeriod}