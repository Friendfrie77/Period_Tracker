const User = require('../mongoose-schmea/User');
const moment = require('moment')
const twillo = require('../utils/twilio')

async function setNotificationStatus (req, res){
    const {email, status, number} = req.body;
    const user = await User.findOne({email: email})
    if (user){
        user.number = number;
        user.notification = status;
        user.save();
        const notification = user.notification
        if(status){
            twillo.sendNotification(user.username, number)
            res.status(200).json({message: 'You will now get notfications before your period starts', notification})
        }else{
            res.status(200).json({message: 'You will no longer get notfications', notification})
        }
    }else{
        res.status(500).json({
            error: 'Internal error please try again'
        })
    }
}
const addNewUserInfo = async (req, res) => {
    const {email, userInfo} = req.body;
    const user = await User.findOne({email: email});
    try{
        if(user.previousPeriod.length === 0){
            user.previousPeriod = userInfo;
            user.save()
            res.status(200).json({message: 'Added Periods'})
        }else{
            user.previousPeriod = userInfo;
            user.save()
            res.status(200).json({message: 'Added Periods'})
        }
    }catch(err){
        res.status(500).json({
            error: 'Internal error please try again'
        })
    }
}
const getUserInfo = async (req, res) =>{
    const {email} = req.body;
    const userInfo = await User.findOne({email: email});
    try{
        if(userInfo){
            const user = userInfo.sendUserInfo(userInfo)
            res.status(200).json({user})
        }
    }catch(err){
        res.status(500).json({error : err.messege})
    }
}
const addNewPeriod = async (req, res) => {
    const {email, startDate, endDate, cycle, avgLength} = req.body;
    try{
        User.findOneAndUpdate({email:email}, {periodStartDate: moment(startDate).format('YYYY-MM-DD'), periodEndDate: moment(endDate).format('YYYY-MM-DD'), avgLength: avgLength, cycle:cycle}).exec()
        const userInfo = await User.findOne({email: email});
        const user = userInfo.sendUserInfo(userInfo)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({error : err.messege})
    }
}

const setPeriodStatus = async (req, res) =>{
    const {email, isBleeding, canBleed} = req.body;
    const userInfo = await User.findOne({email: email});
    if(userInfo){
        if(canBleed != userInfo.canBleed){
            User.findOneAndUpdate({email: email}, {canBleed:canBleed}).exec();
        }
        if(isBleeding != userInfo.isBleeding){
            User.findOneAndUpdate({email: email}, {isBleeding:isBleeding}).exec();
        }
        userInfo.isBleeding = isBleeding;
        userInfo.canBleed = canBleed
        userInfo.save()
        const user = userInfo.sendUserInfo(userInfo)
        res.status(200).json(user)
    }else{
        res.status(500).json({messege: 'Internal Server Error'})
    }
}

const updatePeriod = async (req, res) =>{
    const {email, periodStartDate, periodEndDate} = req.body
    const userInfo = await User.findOne({email: email});
    try{
        if(userInfo.periodStartDate != periodStartDate){
            User.findOneAndUpdate({_id:userInfo._id}, {periodStartDate:periodStartDate}).exec();
        }
        if(userInfo.periodEndDate != periodEndDate){
            User.findOneAndUpdate({_id:userInfo._id}, {periodEndDate:periodEndDate}).exec();
        }
        User.findByIdAndUpdate({_id:userInfo._id},{isBleeding:true}).exec();
        User.findByIdAndUpdate({_id:userInfo._id},{canBleed:false}).exec();
        userInfo.isBleeding = true; 
        userInfo.canBleed = false;
        userInfo.save()
        const user = userInfo.sendUserInfo(userInfo)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({error: err.messege})
    }
}

const addPreviousPeriod = async (req, res) =>{
    const {email, newDates} = req.body;
    try{
        const user = await User.findOne({email: email});
        User.findOneAndUpdate({email: email}, {previousPeriod: [...user.previousPeriod, {...newDates}]}).exec();
    }catch(err){
        res.status(500).json({error: err.messege})
    }
}

const removePeriod = async (req, res) =>{
    const {email, removeDate} = req.body;
    const user = await User.findOne({email:email})
    try{
        user.previousPeriod.splice(removeDate, 1)
        User.findByIdAndUpdate({_id:user._id}, {previousPeriod:user.previousPeriod}).exec()
        const previousPeriod = user.previousPeriod
        res.status(201).json({message:'Successfully Removed Date', previousPeriod})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

const nullPeriodDates = async (req, res) =>{
    const {email} = req.body;
    try{
        const user = await User.findOneAndUpdate({email:email}, {periodStartDate:null, periodEndDate:null}).exec()
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
module.exports = {addNewUserInfo, addNewPeriod,getUserInfo, setPeriodStatus, addPreviousPeriod, updatePeriod, removePeriod, setNotificationStatus, nullPeriodDates}