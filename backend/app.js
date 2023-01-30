const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 8080
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookiePars = require('cookie-parser');
const expressSessions = require('express-session');
const loginRoute = require('../backend/routes/login');
const signupRoute = require('../backend/routes/signup');
const User = require("../backend/mongoose-schmea/User");

require('dotenv').config()



app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookiePars())
app.use(cors({
  origin: ["http://http://localhost:3000"],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(expressSessions({
  key: 'accessToken',
  secret: process.env.ACCESS_TOKEN_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  }
}));
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


app.post('/login', loginRoute)
app.post('/signup', signupRoute)


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
