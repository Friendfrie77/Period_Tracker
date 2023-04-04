const jwt = require('jsonwebtoken');
const User = require('../mongoose-schmea/User');

const register = async (req, res) => {
    const { email, username, password} = req.body;
    const results = await User.exists({email: email})
    try{
        if (!results){
            const user = new User({email, username ,password, refreshToken: '', cycle: '', 
            periodStartDate: '', periodEndDate: '', previousPeriod: []});
            user.save(function(err){
                if (err){
                    console.log(err)
                } else {
                    const newUser = user.sendUserInfo(user)
                    res.status(201).json({newUser})
                }
            })} 
    }catch (err){
        res.status(500).json({error : err.messege})
    }
}

const login = async (req, res) => {
    try{
        const {email, password } =req.body
        User.findOne({email:email}, function(err, username){
            if (err){
                res.status(500).json({error : err.messege})
            }else if (!username){
                res.status(401).json({
                    error: 'Incorrect email or password'
                  });
            }else{
                username.authPassword(password, function(err, same){
                    if(err){
                        res.status(500).json({
                            error: 'Internal error please try again later'
                        });
                    } else if (!same){
                        res.status(401).json({
                            error: 'Incorrect email or password'
                        });
                    } else{
                        const userId = {id: username._id};
                        const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
                        username.accessToken = accessToken
                        const user = username.sendUserInfo(username)
                        res.status(200).json({accessToken, user});
                    }
                })
            }
        })
    }catch(err){
        res.status(500).json({error : err.messege})
    }
}

const deleteAccount = async (req, res) =>{
    const {email} = req.body;
    const user = await User.findOne({email:email});
    if (user){
        User.deleteOne({_id: user._id}).exec();
        res.status(200).json({messege: 'Account Deleted'})
    } else{
        res.status(401).json({
            error:'No account found'
        })
    }
}

const changePassword = async (req, res) =>{
    const {email, oldPassword, newPassword} = req.body;
    console.log(email)
    const user = await User.findOne(({email: email}))
    if (user){
        const isSame = user.authPassword(oldPassword, function(err, same){
            if(err){
                res.status(500).json({
                    error: 'Internal error please try again later'
                });
            } else if (!same){
                res.status(200).json({
                    error: 'Incorrect password'
                });
            }else{
                user.password = newPassword
                user.save()
                res.status(200).json({messege: 'Password Updated'})
            }
        })
    }
}
module.exports = {register, login, deleteAccount, changePassword}