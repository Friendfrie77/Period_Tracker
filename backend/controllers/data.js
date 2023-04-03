const User = require('../mongoose-schmea/User');
const moment = require('moment')

async function setNotificationStatus (req, res){
    const {email, status, number} = req.body;
    const user = await User.findOne({email: email})
    if (user){
        user.number = number;
        user.notification = status;
        user.save();
        const notification = user.notification
        if(status){
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
        User.findOneAndUpdate({email:email}, {periodStartDate: moment(startDate).format('YYYY-MM-DD'), periodEndDate: moment(endDate).format('YYYY-MM-DD'), avgLength: avgLength, cycle:cycle}).exec()
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({error : err.messege})
    }
}

const setPeriodStatus = async (req, res) =>{
    const {email, isBleeding, canBleed} = req.body;
    const user = await User.findOne({email: email});
    console.log(isBleeding, canBleed)
    if(user){
        if(canBleed != user.canBleed){
            User.findOneAndUpdate({_id:user._id}, {canBleed:canBleed}).exec();
        }
        if(isBleeding != user.isBleeding){
            User.findOneAndUpdate({_id:user._id}, {isBleeding:isBleeding}).exec();
        }
        user.save()
        res.status(200).json(user)
    }else{
        res.status(500).json({messege: 'Internal Server Error'})
    }
}

const updatePeriod = async (req, res) =>{
    const {email, periodStartDate, periodEndDate} = req.body
    const user = await User.findOne({email: email});
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
    try{
        const user = await User.findOneAndUpdate({email: email}, {previousPeriod:previousPeriod}).exec();
        res.status(200)
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
        console.log(user)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
module.exports = {addNewUserInfo, addNewPeriod,getUserInfo, setPeriodStatus, addPreviousPeriod, updatePeriod, removePeriod, setNotificationStatus, nullPeriodDates}