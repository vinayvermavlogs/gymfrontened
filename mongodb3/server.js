const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3020 //3000-5000 koi number de sakthe ho
// location run on this port number 

const app = express();
app.use(express.static(__dirname))   // server ko dobara strt kro ( node server.js) + ctrl+C is very imp.
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/paymentsdetails')
const db =mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection succesfull")
})

const userSchema = new mongoose.Schema({
    regd_no:String,
    name:String,
    email:String,
    phno:String
})

const users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})

app.post('/post',async(req,res)=>{
    const {regd_no,name,email,phno} = req.body
    const user = new users({
        regd_no,
        name,
        email,
        phno
    })
    await user.save()
    console.log(user)
    res.send("form submission succesfull")
    
})

app.listen(port,() =>{
    console.log("Server started")
})
