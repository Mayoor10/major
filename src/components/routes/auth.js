const express = require('express')
const router= express.Router()
const mongoose =require('mongoose')
const bcrypt = require('bcrypt')
const User = mongoose.model("User")//how??
const jwt = require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const requireLogin = require('../middlewares/requireLogin')

router.get('/',(req,res)=>{
    res.send("hell0")
})

router.get('/protected',requireLogin,(req,res)=>{
    res.send("Yup this is ur profile !");
})
router.post('/signUp',(req,res)=>{
    const {email,name,password}=req.body
    if(!email||!name||!password){
        return res.status(422).json({error:"Pls fill all fields!"})
    }
    User.findOne({email:email})
    .then((saveUser)=>{
        if(saveUser){
            return res.status(422).json({error:"This email alreadt exists!"})
        }
        bcrypt.hash(password,12)
        .then((hashedPassword)=>{
            const user =new User({
                name:name,
                email:email,
                password:hashedPassword,
            })
            user.save()
            .then(()=>{
                return res.json({message:"User saved successfull"})
            })
            .catch((err)=>{
                return res.status(422).json({error:err})
            })


        })

        
    })
    .catch((err)=>{console.log(err)})
    
})

router.post('/signIn',(req,res)=>{    
    const {email,password}=req.body
    if(!email||!password){
        return res.status(422).json({error:"Fill all fields!"})
    }
    User.find({email:email})
    .then((savedUser)=>{
        if(!savedUser){//case where no email is found in database
            return res.status(422).json({error:"Enter valid username and password"})
        }
        bcrypt.compare(password,savedUser.password,(matchedUser)=>{
            if(matchedUser){//case where email and password do not match
                const token = jwt.sign({id:savedUser._id},JWT_SECRET)
                return res.json({token:token})
            }
            else{
                return res.status(404).json({error:"Enter valid username and password"})
            }

        })
        
    })
    .catch((err)=>{console.log(err)})
    

    
})
module.exports = router;