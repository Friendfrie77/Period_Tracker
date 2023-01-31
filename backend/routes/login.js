const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../mongoose-schmea/User');;
require('dotenv').config()

module.exports =  async (req, res)=>{
  let userInfo = req.body;
  console.log(userInfo)
  let signInInfo = {email: userInfo.userInfo.email, password: userInfo.userInfo.password};
  console.log(signInInfo)
  User.findOne({email: signInInfo.email}, function(err, user){
    if (err){
      res.status(500).json({
        error: 'Internal error please try again later'
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password'
      });
    } else {
      user.authPassword(signInInfo.password, function(err, same){
        if (err){
          console.log(err)
          res.status(500).json({
            error: 'Internal error please try again later'
          });
        } else if (!same){
          res.status(401).json({
            error: 'Incorrect email or password'
          });
        } else{
          const userId = {id: user.id};
          const id = user.id;
          const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
          User.findOneAndUpdate({id: user.id}, {accessToken: accessToken}, (err) =>{
            if (err){
              console.log(err)
            }
          });
          res.cookie('token', accessToken, {
            httpOnly: true
          });
          res.json({accessToken, id});
        }
      });
    }
  });
}
