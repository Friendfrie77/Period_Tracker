const User = require('../mongoose-schmea/User');
const moment = require('moment')

const addNewUserInfo = async (req, res) => {
    const {email, userInfo} = req.body;
    const user = await User.findOne({email: email});
    try{
        if(user.previousPeriod.length === 0){
            user.previousPeriod = userInfo;
            user.save()
            console.log('here')
            res.status(200)
        }else{
            user.previousPeriod = userInfo;
            user.save()
            console.log('here')
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
            console.log(user)
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
        console.log(user)
        res.status(200).json({user})
    }catch(err){
        res.status(500).json({error : err.messege})
    }
}

module.exports = {addNewUserInfo, addNewPeriod,getUserInfo}