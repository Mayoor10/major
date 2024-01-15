const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Post =mongoose.model("Post")
const requireLogin=require('../middlewares/requireLogin')

router.post('/createPost',requireLogin,(req,res)=>{
    const {title,desc}=req.body
    if(!title || !desc){
        return res.status(422).json({error:"Fill all fields"})
    }
    // console.log(req.user)
    // res.send("oh")
    const post = new Post({
        title:title,
        desc:desc,
        postedBy:req.user//refactor this later 
    })
    post.save()
    .then((postData)=>
    {
        return res.json({post:postData})
    })
    .catch((err)=>{console.log(err)})

    

})

module.exports = router