const mongoose = require('mongoose');
const Joi = require('joi')
 const userSchema = new mongoose.Schema({
     name: {
         type: String, required: true
     },
     email: {
         type: String, required: true, unique:true
     },
     password:{
         type: String, required: true, minlength: 6
     }
 })
 

 const User = mongoose.model('User', userSchema)

 function validateUser(user){
     const schema ={
         name: Joi.string().required(),
         email:Joi.string().required().email(),
         password:Joi.string().required().min(5)
     }
     return Joi.validate(user, schema)
 }
 exports.User = User;
 exports.validate = validateUser