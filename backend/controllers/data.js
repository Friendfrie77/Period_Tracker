const User = require('../mongoose-schmea/User');

const addPeriod = async (req, res) => {
    const {email, userInfo} = req.body;
    const user = await User.findOne({email: email})
    try{
        if(user.previousPeriod.length === 0){
            user.previousPeriod = userInfo;
            user.save()
            res.status(200)
        }else{
            user.previousPeriod = userInfo;
            user.save()
            res.status(200)
        }
    }catch(err){
        res.status(500).json({
            error: 'Internal error please try again'
        })
    }
}


module.exports = {addPeriod}