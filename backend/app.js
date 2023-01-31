const express = require("express");
const cors = require('cors');
const app = express();
const PORT = 8080
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookiePars = require('cookie-parser');
const expressSessions = require('express-session');
const tokenAuth = require('../backend/middleware/tokenAuth');
const loginRoute = require('../backend/routes/login');
const signupRoute = require('../backend/routes/signup');
const authRoute =require('../backend/routes/authToken')
const User = require("../backend/mongoose-schmea/User");

require('dotenv').config()
const corsOptions ={
  exposedHeaders: 'Set-Cookie'
};

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookiePars())
app.use(cors(corsOptions));

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

app.get('/checkToken', tokenAuth, function(req , res){
  res.sendStatus(200);
});
app.post('/authToken', authRoute)
app.post('/login', loginRoute)
app.post('/signup', signupRoute)


app.listen(PORT, () =>{
  console.log(`Listening at http://localhost:${PORT}`)
})
