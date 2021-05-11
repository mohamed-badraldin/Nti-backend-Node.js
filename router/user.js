const express = require('express');
const router = express.Router();
const User = require('../model/user');
const checkRequiredMiddleware = require('../middleware/checkRequired');
const authenticationMiddleware = require('../middleware/authentication')
const CustomError = require('../helpers/customError')
///////////////////////////////////////////// Create Users /////////////////
router.post('/', checkRequiredMiddleware,
async (req, res, next)=>{
    try{
        const createUser = new User({
            username: req.body.username,
            age: req.body.age,
            password: req.body.password
        })
        const user = await createUser.save();
        res.status(200).send(user);
    }catch(err) {
        err.statusCode = 422;
        next(err);
    }
})
///////////////////////////////////////////////// Login ///////////////////////////

router.post('/login', checkRequiredMiddleware,
async (req ,res, next)=>{
   try{
    const user = await User.findOne({username: req.body.username});
    if(!user) throw new CustomError('Wrong username or password',401)

    const isMatch = await user.checkPassword(req.body.password);
    if(!isMatch) throw new CustomError('Wrong username or password',401)
    
    const token = await user.generateToken();
    res.send({
        user,
        token,
        message: 'Hello again'
    })
   }catch(err){
       next(err)
   }
});
/////////////////////////////////////////////////// Profile  //////////////////////
router.get('/profile', 
authenticationMiddleware,
(req, res, next) => res.send(req.user))
///////////////////////////////////////////////////////////////////////////////////

router.get('/', (req, res, next)=>{
    User.find({}, (err,users)=>{
         
    })
})

router.patch('/:id', (req, res, next)=>{
    
})

router.delete('/:id', (req, res, next)=>{
    
})


module.exports = router