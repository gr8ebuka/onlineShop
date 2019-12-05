const {User, validate } = require('../models/users');
const bcrypt = require('bcrypt');
const Objectid = require('objectid');

exports.createUser =  async(req, res) => {    
    const {error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(409).send('User email already exist')
  
    user = await new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone: req.body.phone
    });
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(req.body.password, salt)    
    user.save();
    // const token = user.generateAuthToken()
    // res.header('x-auth-token', token)
    res.status(201).json({
        message: 'New user created',
        User: {
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            phone:user.phone

    
        }
    });

}

exports.userLogin =async (req, res, next) => {
    const { error} = validate(req.body);
    if ( error ) return  res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('Wrong Email or password');

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Wrong Email or password');

    user = await new User({
        email:req.body.email,
        password:req.body.password
    })
    const token = user.generateAuthToken()
    //user.save()
    res.header('x-auth-token', token).status(201).json({
        message: 'User logged in',
        user: {
            _id:user._id,
            email:user.email,
            //token:token            
        }
    })

}

exports.deleteUser = async (req, res, next)=>{
    const validId = Objectid.isValid(req.params.id)
       if(!validId) return res.status(400).json({
        message:'Invalid user id'
     });

     const user = await User.findByIdAndDelete(req.params.id);
     if(!user) return res.status(400).send('user ID does not exist');

     res.send(user);
     console.log(user);
  
}

exports.getOneUser = async(req, res, next) => {
    // const validId = Objectid.isValid(req.params.id)
    //    if(!validId) return res.status(400).json({
    //     message:'Invalid user id'
    //  });

    const user = await User.find().select('-password')
    
    console.log('user:  ',user)
    if(!user) return res.status(400).send('User not found')
    res.send(user)
}