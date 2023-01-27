const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 8080
const mongoose = require('mongoose');
const User = require("./User");
const bcrypt = require('bcrypt')
require('dotenv').config()



app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());

const uri = `${process.env.dburi}`

async function db (){
  try{
    await mongoose.connect(uri)
    console.log('Connected to db')
  }catch (error){
    console.error(error);
  }
}


db().catch(console.error);

app.post('/signup', async (req, res)=> {
  let userInfo = req.body
  let newUser = {email: userInfo.userInfo.email, userName: userInfo.userInfo.userName, password: userInfo.userInfo.password}
  const results = await User.exists({email: newUser.email})
  try{
    if (!results){
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(newUser.password, salt)
      const user = new User({email:newUser.email, username: newUser.userName, password:hash})
      const nuser = await user.save()
      return res.status(201).json({
        success:'Register Successfully'
      })
    }else{
      res.status(400).json({
        error:'Email is already taken. Do you already have an account?'
      })
    }
  }catch (err){
    res.status(500).json({
      error:'Sever error, please try again later.'
    })
  }
});



app.listen(PORT, () =>{
  console.log(`Listening at http://localhost:${PORT}`)
})
