const mongoose = require('mongoose');
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')
 const userSchema = new mongoose.Schema({
     name: {
         type: String, 
         //required: true
     },
     email: {
         type: String, required: true, unique:true
     },
     phone: {
         type: String, required: true
     },
     password:{
         type: String, required: true, minlength: 6
     }
 })
 
 userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        email: this.email,
        _id:this._id},
           process.env.JWT_PrivateKey,
        //config.get('jwt_key'),
        {expiresIn: '24h'}
          )
          return token
 }

 const User = mongoose.model('User', userSchema)

 function validateUser(user){
     const schema ={
         name: Joi.string(),
         email:Joi.string().required().email(),
         password:Joi.string().required().min(5),
        //  phone: Joi.string().required()
     }
     return Joi.validate(user, schema)
 }
 exports.User = User;
 exports.validate = validateUser