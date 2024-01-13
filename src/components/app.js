const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000;
const {MONGOURI} = require('./keys')
require('./users')
app.use(express.json())
app.use(require('./routes/auth'))
mongoose.connect(MONGOURI)
.then(()=>{console.log("Connection to Mongo was Successfull!")})
.catch((err)=>{console.log("Connection to Mongo was Unsuccessfull!!",err)})


app.listen(PORT,()=>{console.log(`Server is running on port : ${PORT}`)})