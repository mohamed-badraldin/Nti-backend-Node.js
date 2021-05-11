const User = require('../model/user');
module.exports = async (req, res, next) =>{
    try {
        const authorization = req.headers.authorization;
        if(!authorization) throw new Error('Authorization required');
            
        req.user = await User.getToken(authorization);
        if(!req.user) throw new Error('Authorization required');
        next();
        }
        catch(err){
            err.statusCode = 401;
            next(err)
        }
    }