const User = require('../mongoose-schmea/User');

module.exports = async (req, res)=> {
    let userInfo = req.body
    let newUser = {email: userInfo.userInfo.email, userName: userInfo.userInfo.userName, password: userInfo.userInfo.password}
    const results = await User.exists({email: newUser.email})
    try{
      if (!results){
        const user = new User({email:newUser.email, username: newUser.userName, password: newUser.password, accessToken: ''});
        user.save(function(err){
            if (err){
                console.log(err);
                res.status(500).json({
                    error:'Sever error, please try again later.'
                });
            } else {
                res.status(200).json({
                    success:'Register Successfully'
                  });
            }
        });
      }else{
        res.status(400).json({
          error:'Email is already taken. Do you already have an account?'
        })
      }
    }catch (err){
      res.status(500).json({
        error:'Sever error, please try again later.'
      })
    }
  };