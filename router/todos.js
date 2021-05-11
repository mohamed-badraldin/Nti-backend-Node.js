const express = require('express');
const router = express.Router();


router.post('/', (req, res, next)=>{
    
})
router.get('/', (req, res, next)=>{
    // const err = new Error()       // make error
    // err.statusCode = 404;                // status
    // err.message = 'custom err message'  // message
    // return next(err)
    res.send('hi from todo Router')
})
router.patch('/:id', (req, res, next)=>{
    
})

router.delete('/:id', (req, res, next)=>{
    
})



module.exports = router