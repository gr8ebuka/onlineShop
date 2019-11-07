const express = require('express');
const Objectid = require('objectid')
const router = express.Router();
const {User, validate } = require('../models/users');
const bcrypt = require('bcrypt');

router.post('/' , async(req, res) => {
    
    const {error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(409).send('User email already exist')
  
    user = await new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(req.body.password, salt)    
    user.save();
    res.status(201).json({
        message: 'New user created',
        User: {
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password
    
        }
    });

});
router.get('/:id', async (req, res, next)=>{
    const validId = Objectid.isValid(req.params.id)
    if(!validId) return res.status(400).json({
        message:'no user found'
     })
    
         const user = await User.findById( req.params.id);
         if(!user) return res.status(400).send('user ID does not exist')
         res.send(user)
   
 });

router.delete('/:id', async (req, res, next)=>{
    console.log(req.params)
    const validId = Objectid.isValid(req.params.id)
   
    if(!validId) return res.status(400).json({
        message:'Invalid user id'
     })

     const user = await User.findByIdAndDelete(req.params.id)
     if(!user) return res.status(400).send('user ID does not exist')
     res.send(user)
     console.log(user)
  
})

module.exports = router;