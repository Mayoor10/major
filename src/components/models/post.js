const mongoose = require('mongoose')
const User = mongoose.model("User")
const {ObjectId}= mongoose.Schema.Types
const Post = new mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    photo:{type:String,default:"no photo"},
    postedBy:{type:ObjectId,ref:User},
    postedAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model("Post",Post)