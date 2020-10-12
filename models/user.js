const mongoose = require('mongoose');
const Joi = require('joi')
const jwt = require("jsonwebtoken");


const userSchema = mongoose.Schema({
    name: { type: String, required: true, min: 3 },
    email: { type: String, required: true, unique: true },
    password:{type:String,required:true},
    profilePic: { type: String, required: true },
    position: { type: String, required: true },
    stories: { type: Array ,default:[]},
    rating: { type: Number,default:0 },
    friends:{type:Array,default:[]}
})
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
    {
      _id: this.id,
    },
    "privatekey"
  );
  return token;
}
const User = mongoose.model('users', userSchema);

// Joi Validation of request body 

function validateUser(user) {
    
    const validUserSchema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().required().email({}),
        password:Joi.string().required().min(5),
        profilePic: Joi.string().required(),
        position: Joi.string().required(),
        stories: Joi.array().default([]),
        rating: Joi.number().min(0).default(0),
        friends:Joi.array().default([])
    }

    return Joi.validate(user, validUserSchema);
}


module.exports.User = User;
module.exports.validateUser =validateUser