const express = require('express')
const route = express.Router();
const bcrypt = require('bcrypt')
const { User, validateUser } = require('../models/user');
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const auth  =require('../autherisation/authztion')

//register a user to database 
route.post('/register', async (req, res) => {
    //check for valid request 
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    

    //check if user already exists 

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already exists')
    
    //hashing the password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    //saving the userObject 
    user = new User({
    name: req.body.name,
    email: req.body.email,
    password:hashedPassword,
    profilePic: req.body.profilePic,
    position: req.body.position,
    })
    //generating auth token 
    const token = user.generateAuthToken();
    try {
        const result = await user.save()
        res.header('x-auth-token',token).send(user)
        
    } catch (err) {
        console.log('something failed ' + err.message)
    }
})


route.post('/auth', async (req, res) => {
    
    const { error } = validateAuthUser(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('invalid email or password')
    
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send(false)
    const authToken = user.generateAuthToken()
    res.header('x-auth-token',authToken).send(user)
})

route.get('/me', auth, async (req, res) => {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) return res.status(400).send('invalid user')
    res.send(user)
})


function validateAuthUser(user) {
    const userLoginSchema = { 
        email: Joi.string().email({}).required(),
        password:Joi.string().required().min(5)
    }
    return Joi.validate(user, userLoginSchema);
}



module.exports = route;