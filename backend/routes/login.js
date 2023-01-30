const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../mongoose-schmea/User');
require('dotenv').config()

module.exports =  async (req, res)=>{
    let userInfo = req.body;
    let signInInfo = {userName: userInfo.userInfo.userName, password: userInfo.userInfo.password};
    const results = await User.find({username: signInInfo.userName});
    try{
      if(results){
        const hashpass = results[0].password;
        const id = results[0].id;
        const passVaild= bcrypt.compare(signInInfo.password, hashpass);
        if (passVaild){
          const accessToken = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
          res.cookie('accessToken', accessToken,{
            httpOnly: true
          });
          return res.status(201).json({
            success:'Register Successfully'
          })
        }else{
          return res.status(401).json({
            error: 'Invaild username or password.'
          })
        }
        }
    }catch(err){
      console.log(err)
    }
  };