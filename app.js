const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 8080
const mongoose = require('mongoose');
const User = require("./User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
const posts = [
  {
    userName: 'test',
    title: 'test'
  }
]

db().catch(console.error);
 app.get('/posts', authToken, (req, res)=>{
  res.json(posts)
 })
app.post('/login', async (req, res)=>{
  let userInfo = req.body;
  let signInInfo = {userName: userInfo.userInfo.userName, password: userInfo.userInfo.password};
  const results = await User.find({username: signInInfo.userName});
  try{
    if(results){
      console.log(results)
      const hashpass = results[0].password;
      const id = results[0].id;
      console.log(id)
      const passVaild= bcrypt.compare(signInInfo.password, hashpass);
      if (passVaild){
        const accessToken =jwt.sign(id, process.env.ACCESS_TOKEN_SECRET)
        console.log(accessToken)
        res.json({accessToken: accessToken})
      }else{
        return res.status(401).json({
          error: 'Invaild username or password.'
        })
      }
      }
  }catch(err){
    console.log(err)
  }
});
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

function authToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(PORT, () =>{
  console.log(`Listening at http://localhost:${PORT}`)
})
