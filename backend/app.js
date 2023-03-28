require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const corsOptions = require ('./config/corsOptions');
const credentials = require('./middleware/credentials');
const db = require('./config/dbConn');
const auth = require('./controllers/auth');
const data = require('./controllers/data')

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userInfo');


db()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(credentials)
app.use(cors(corsOptions));

app.post('/register', auth.register)

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

// data.checkTextStatus()


app.listen(PORT, () =>{
  console.log(`Listening at http://localhost:${PORT}`)
})
