const express = require('express')
const router = express.Router();
const auth = require('../autherisation/authztion')
const {Comment,validateComment} = require('../models/comment')

router.post('', auth, async (req, res) => {
    
    const { error } = validateComment(req.body);
    if (error) return res.status(401).send(error.details[0].message)

    const comment = new Comment({
        postId: req.body.postId,
        message: req.body.message,
        postUserId: req.body.postUserId,
        commentUserId: req.body.commentUserId,
        commentUserImage: req.body.commentUserImage,
        likes:[]
    })

    try {
        const result = await comment.save();   
        res.send(result);
    } catch (ex) {
        console.log("Error Occured In saving a comment: ", ex.message)
    }

})

router.get("/:postId", auth, async (req, res) => {
    const comments = await Comment.find({ postId: req.params.postId })
    if (!comments) return res.status(404).send("no record found")
    
    res.send(comments)
})

router.put("/like/:commentId", auth, async (req, res) => {
    let comment = await Comment.findById(req.params.commentId)
    if (!comment) return res.status(404).send("No Such Comment Found")
    likes = comment.likes
    likes.push(req.body.userId)
    comment = await comment.set({
        likes:likes
    })  
    try {
        const result = await comment.save()
        res.send(result)
    } catch (ex) {
        res.status(501).send(ex.message);
    }
})
module.exports = router