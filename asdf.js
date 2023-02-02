const User = require('../mongoose-schmea/User');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) =>{
    const cookies = req.cookies
    
    const {email, password} = req.body
    const loginUser = await User.findOne({email: email}, function(err, user){
        if (!user){
            return res.status(401)
        } else {
            user.authPassword(password, function(err, same){
                if (!same){
                    return res.status(401)
                }else{
                    const accessToken = jwt.sign(
                        {
                            "UserInfo":{
                                'userID': user._id,
                                'username': user.username
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '15m'}
                    );
                    const newRefreshToken = jwt.sign(
                        {
                            "UserInfo":{
                                'userID': user._id,
                                'username': user.username
                            }
                        },
                        process.env.REFRESH_TOKEN_SECRET,
                        {expiresIn: '1h'}
                    );
                    
                console.log(accessToken)
                
                let newRefreshTokenArray =
                    !cookies?.jwt
                        ? user.refreshToken
                        : user.refreshToken.filter(rt => rt !== cookies.jwt);
                if (cookie?.jwt){
                    const refreshToken = cookies.jwt;
                    const foundToken =  User.findOne({refreshToken});
                    if (!foundToken){
                        newRefreshTokenArray = [];
                    }
                    res.clearCookie('jwt', {httpOnly: true, secure: false, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000})
                    res.json({ accessToken });
                }
            })
        }
    })
}

module.exports = { handleLogin };