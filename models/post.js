const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const postSchema = mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, require: true },
    userProfilePic: { type: String, required: true },
    userName: { type: String, required: true },
    bgImage: { type: String, required: false },
    fontColor: { type: String, required: true },
    timeStamp: { type: Date, default:Date.now},
    postDescription: { type: String, required: true },
    likedBy: { type: Array  },
    images: { type: Array},
    files: { type: Array },
    gifs:{type:Array}

})
const Post = new mongoose.model('posts', postSchema);

function validatePost(post) {
    const requestPostSchema = {
    userId: Joi.objectId().required(),
    userProfilePic: Joi.string().required(),
    userName: Joi.string().required(),
    bgImage: Joi.string(),
    fontColor: Joi.string().required(),
    postDescription: Joi.string(),
    likedBy: Joi.array(),
    images: Joi.array(),
    files: Joi.array(),
    gifs:Joi.array()
    }
    return Joi.validate(post, requestPostSchema)
    
}

module.exports.Post = Post
module.exports.validatePost  = validatePost 