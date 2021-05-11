const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');
const signJwt = util.promisify(jwt.sign);
const verifyJwt = util.promisify(jwt.verify);
const _ = require('lodash')
////////////////////////////////////////////// Schema ////////////////////////////////////
const schema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        index: true
    },
    password: {
        type: String,
        required: true
    }
},{
    toJSON: {
        transform: (doc, ret) => _.omit(ret, ['__v', 'password'])
    }
});
///////////////////////////////////////////////////// Hashing password befor saving //////////////
const saltRounds = 13;
schema.pre('save', async function(){
    const currentDocument = this;
    if(currentDocument.isModified("password")){
        const salt = await bcrypt.genSalt(saltRounds);
        currentDocument.password = await bcrypt.hash(currentDocument.password, salt);
    }
})
////////////////////////////////////////////////////////////////////// Check Password ////////////
schema.methods.checkPassword = function (plainPassword) {
    const currentDocument = this;
    return bcrypt.compare(plainPassword, currentDocument.password);
}
//////////////////////////////////////////////////////////////////////// JsonWebToken /////////////
const jwtSecret = "ntifinalltask"
schema.methods.generateToken = function (){
    const currentDocument = this;
    return signJwt({id: currentDocument.id }, jwtSecret, {expiresIn: "1h"} )
}
////////////////////////////////////////////////////////////////////////////// verification of token /////////
schema.statics.getToken = async function (token) {
    const User = this;
    const {id} = await verifyJwt(token, jwtSecret);
    const user = await User.findById(id);
    return user;
}
/////////////////////////////////////////////////////////////////////////// Export ////////////////
const User = mongoose.model('User', schema);
module.exports = User;