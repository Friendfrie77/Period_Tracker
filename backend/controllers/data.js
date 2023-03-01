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
    const user = await User.findOne({email: email});
    try{
        user.periodStartDate = moment(startDate).format();
        user.periodEndDate = moment(endDate).format();
        user.avgLength = avgLength;
        user.cycle = cycle;
        user.save()
        res.status(200).json({user})
    }catch(err){
        res.status(500).json({error : err.messege})
    }
}

const setPeriodStatus = async (req, res) =>{
    const {email, isBleeding, canBleed} = req.body;
    const user = await User.findOne({email: email});
    try{
        if(canBleed != user.canBleed){
            user.canBleed = canBleed;
        }
        if(isBleeding != user.isBleeding){
            user.isBleeding = isBleeding
        }
        user.save()
    }catch(err){
        res.status(500).json({error : err.messege})
    }
}

const updatePeriod = async (req, res) =>{
    const {email, periodStartDate, periodEndDate} = req.body
    const user = await User.findOne({email: email});
    try{
        if(user.periodStartDate != periodStartDate){
            user.periodStartDate = periodStartDate
        }
        if(user.periodEndDate != periodEndDate){
            user.periodEndDate = periodEndDate
        }
        user.save()
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