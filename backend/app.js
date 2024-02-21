require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schedule = require('node-schedule')
const corsOptions = require ('./config/corsOptions');
const credentials = require('./middleware/credentials');
const db = require('./config/dbConn');
const auth = require('./controllers/auth');
const data = require('./controllers/data')
const utils = require('./utils/twilio')
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userInfo');


db()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(credentials)
app.use(cors(corsOptions));

app.post('/register', auth.register)
app.post('/demo', auth.demoAccount)

app.use('/auth', authRoutes)
app.use('/user', userRoutes)


schedule.scheduleJob('30 14 * * *', function(){
  utils.checkTextStatus()
  console.log('done')
})


app.listen(PORT, () =>{
  console.log(`Listening at http://localhost:${PORT}`)
})
