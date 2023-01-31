const jwt = require('jsonwebtoken');
const User = require('../mongoose-schmea/User');;
require('dotenv').config()

module.exports = async (req, res)=> {
    const userInfo = req.body;
    const id = userInfo.id;
    const localToken = userInfo.token;
    // User.findOne({id: id}, function(err, user){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         const serverToken = user.accessToken
    //         if (serverToken != localToken){
    //             res.status(401).json({
    //                 isVaild: false
    //             });
    //         }else{
    //             console.log('wah')
    //         }
    //     }
    // })
    res.status(200).json({
        isVaild: true
    })
}