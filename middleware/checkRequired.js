const express = require('express');
const { body, validationResult } = require('express-validator');
const CustomError = require('../helpers/customError')


module.exports =
[
    // username must be an email
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),


    (req, res, next)=>{
        const errors = validationResult(req)
            if(!errors.isEmpty()) {
                const err = new CustomError('Validation Error',422, errors.mapped())
                return next(err)
            }
            return next();
    }
]