const User = require('../mongoose-schmea/User');
const Guest = require('../mongoose-schmea/Demo')
const moment = require('moment')
const twillo = require('../utils/twilio')

//used to check user role and return the mongoose-schmea name that is needed for functions needed. 
function checkUserRole(role){
    let roleType;
    if (role === 'Guest'){
        roleType = Guest
    }else{
        roleType = User
    }
    return roleType
}
//fix this with id
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

//used to both add new periods for perid for the period info page and also adding periods for a new account
//used in usePeriodInfo hook, and useAccountSetup hook.
const addNewUserInfo = async (req, res) => {
    const {id, role, loggedPeriods} = req.body;
    const roleType = checkUserRole(role);
    const user = await roleType.findById(id);
    try{
        if(user.previousPeriod.length === 0){
            user.previousPeriod = loggedPeriods;
            user.save()
            previousPeriod = user.previousPeriod
            const periodInfo = user.calcCycleInfo(user);
            console.log(periodInfo);
            res.status(200).json({message: 'Added Periods', periodInfo, previousPeriod})
        }else{
            let newPeriods = user.previousPeriod;
            newPeriods = [...newPeriods, ...loggedPeriods];
            user.previousPeriod = newPeriods;
            user.save()
            previousPeriod = user.previousPeriod
            res.status(201).json({message: 'Added Periods', previousPeriod})
        }
    }catch(err){
        res.status(500).json({
            error: 'Internal error please try again'
        })
    }
}
//fix this with id role
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
//fix this id role
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
//sets user status for if period is near, or if user is on period
//uesed in: userPeriodInfo hook
const setPeriodStatus = async (req, res) =>{
    const {id, role, isBleeding, canBleed} = req.body;
    const roleType = checkUserRole(role)
    const user = roleType.findById(id);
    if(user){
        if(canBleed != user.canBleed){
            user.canBleed = canBleed;
        }if(isBleeding != user.isBleeding){
            user.isBleeding = isBleeding;
        }
        const periodStatus = {
            canBleed: user.canBleed,
            isBleeding: user.isBleeding
        }
        res.status(201).json({periodStatus})
    }else{
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const updatePeriod = async (req, res) =>{
    const {id, periodStartDate, periodEndDate} = req.body
    const userInfo = await User.findById(id);
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
        const user = userInfo.sendUserInfo(userInfo)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json({error: err.messege})
    }
}
//function to add the current period to the list of previous periods, the updated list gets passed from the front end, then saved.
//used in usePeriodInfo hook, 
const addPreviousPeriod = async (req, res) =>{
    const {id, role, newDates} = req.body;
    const roleType = checkUserRole(role)
    try{
        roleType.findByIDAndUpdate(id, {previousPeriod: newDates}).exec();
        res.status(201)
    }catch(err){
        res.status(500).json({error: err.messege})
    }
}
//function to allow user to remove period via the front end page periodInfo
//used in the usePeriodInfo hook
const removePeriod = async (req, res) =>{
    const {id, role, removeDate} = req.body;
    const roleType = checkUserRole(role);
    const user = await roleType.findById(id);
    try{
        user.previousPeriod.splice(removeDate, 1)
        roleType.findByIdAndUpdate(id , {previousPeriod:user.previousPeriod}).exec()
        const previousPeriod = user.previousPeriod
        res.status(201).json({message:'Successfully Removed Date', previousPeriod})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

//used to null out PeriodDates and calcs new ones
const nullPeriodDates = async (req, res) =>{
    const {id, role} = req.body;
    const roleType = checkUserRole(role)
    try{
        await roleType.findByIdAndUpdate(id, {periodStartDate:null, periodEndDate:null}).exec();
        const user = await roleType.findById(id);
        if(user){
            const newUserInfo = user.calcCycleInfo(user);
            res.status(201).json({newUserInfo});
        }
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
module.exports = {addNewUserInfo, addNewPeriod,getUserInfo, setPeriodStatus, addPreviousPeriod, updatePeriod, removePeriod, setNotificationStatus, nullPeriodDates}