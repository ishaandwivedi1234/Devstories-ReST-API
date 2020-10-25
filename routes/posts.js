const express = require('express')
const route = express.Router();
const auth = require('../autherisation/authztion')
const {Post,validatePost} = require('../models/post')
route.post('/', auth, async (req, res) => {
    const { error } = validatePost(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const post = new Post({
        userId: req.body.userId,
        userProfilePic: req.body.userProfilePic,
        userName: req.body.userName,
        bgImage: req.body.bgImage,
        fontColor: req.body.fontColor,
        // optional parameters 
        postDescription: req.body.postDescription,
        likedBy: [],
        images: req.body.images,
        files: req.body.files,
        gifs: req.body.gifs
    })

    try {
        const result = await post.save();
        res.send(result)
    } catch (ex) {
        console.log(ex.message)
         res.status(500).send('something failed  .. ').send(ex.message)

    }
})

route.get('/', auth, async(req, res) => {
    try {
        const posts = await Post.find({}).sort({timeStamp:-1})
        res.send(posts)

    }catch(ex) {
        console.log(ex.message)
         res.status(500).send('something failed  .. ').send(ex.message)
    }
})
route.get('/user/:id', auth, async(req, res) => {
    try {
        const userPosts = await Post.find({userId:req.params.id}).sort({timeStamp:-1})
        res.send(userPosts)

    }catch(ex) {
        console.log(ex.message)
        res.status(500).send('something failed  .. ')
    }
})

route.get('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id).sort({timeStamp:-1})
        res.send(post)

    }catch(ex) {
        console.log(ex.message)
         res.status(500).send('something failed  .. ').send(ex.message)

    }
})

route.put('/:id/:userId', auth, async (req, res) => {
    const { error } = validatePost(req.body)
    if(error) res.status(400).send(error.details[0].message)
    try {
        let post = await Post.findById(req.params.id)
        if (!post) return res.status(401).send('post not found')
        likes = post.likedBy;
        likes.push(req.params.userId.toString());
        post = await post.set({
        userId: post.userId,
        userProfilePic: post.userProfilePic,
        userName: post.userName,
        bgImage: post.bgImage,
        fontColor: post.fontColor,
        // optional parameters 
        postDescription: post.postDescription,
        likedBy: likes,
        images: post.images,
        files: post.files,
        gifs: post.gifs
        })
        await post.save();
        res.send(post)
    } catch (ex) {
        console.log('something failed..')
        res.status(500).send(ex.message)
    }
})


route.delete('/:id', auth, async(req, res) => {

    try{
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).send('no post found')
        res.send(post)

    } catch (ex) {
        console.log('something failed ' + ex.message)
        res.status(500).send(ex.message)
    }

})




module.exports = route