const jwt = require('jsonwebtoken');
const User = require('../mongoose-schmea/User');

const register = async (req, res) => {
    const { email, username, password} = req.body;
    const results = await User.exists({email: email})
    try{
        if (!results){
            const newUser = new User({email, username ,password, refreshToken: '', cycle: '', 
            periodStartDate: '', periodEndDate: '', previousPeriod: []});
            console.log(newUser)
            newUser.save(function(err){
                if (err){
                    console.log(err)
                } else {
                    delete newUser.password
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
        User.findOne({email:email}, function(err, user){
            if (err){
                res.status(500).json({error : err.messege})
            }else if (!user){
                res.status(401).json({
                    error: 'Incorrect email or password'
                  });
            }else{
                user.authPassword(password, function(err, same){
                    if(err){
                        res.status(500).json({
                            error: 'Internal error please try again later'
                        });
                    } else if (!same){
                        res.status(401).json({
                            error: 'Incorrect email or password'
                        });
                    } else{
                        const userId = {id: user._id};
                        const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);
                        user.accessToken = accessToken
                        user.save();
                        delete user.password;
                        res.status(200).json({accessToken, user});
                    }
                })
            }
        })
    }catch(err){
        res.status(500).json({error : err.messege})
    }
}

const addPeriod = async (req, res) => {
    
}


module.exports = {register, login }