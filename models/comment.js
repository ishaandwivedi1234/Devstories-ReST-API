const mongoose = require('mongoose')
const joi = require('joi');
const joiObjectid = require('joi-objectid');
joi.objectId = require('joi-objectid')(joi)

const commentSchema = new mongoose.Schema({

    postId: { type: mongoose.Types.ObjectId, required: true },
    message: { type: String, required: true },
    postUserId: { type: mongoose.Types.ObjectId, required: true },
    commentUserId: { type: mongoose.Types.ObjectId, required: true },
    likes: { type: Array },
    commentUserImage:{type:String,required:true},
    timestamp: { type: Date, default: Date.now() }
    
});

const Comment = new mongoose.model('comments', commentSchema);

function validateComment(comment) {
    const commentsValidationSchema = {
        postId: joi.objectId().required(),
        message: joi.string().required(),
        postUserId: joi.objectId().required(),
        commentUserId: joi.objectId().required(),
        likes: joi.array(),
        commentUserImage: joi.string().required()
    };

    return joi.validate(comment, commentsValidationSchema);
}

module.exports.Comment = Comment;
module.exports.validateComment = validateComment;