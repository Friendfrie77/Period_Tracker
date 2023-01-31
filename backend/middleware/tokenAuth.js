const jwt = require('jsonwebtoken');
require('dotenv').config()

const tokenAuth = function (req, res, next) {
    
    if (!authToken) {
        res.status(401).json({
            error: 'Unauthorized: No token provided'
        });
    } else{
        jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, function(err, decoded){
            if (err){
                res.status(401).json({
                    error: 'Unauthorized: No token provided'
                });
            } else {
                req.id = decoded.id;
                next();
            }
        });
    }
};

module.exports = tokenAuth; 