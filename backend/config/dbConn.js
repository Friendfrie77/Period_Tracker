const mongoose = require('mongoose');

async function db (){
    try{
      await mongoose.connect(process.env.dburi), {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
      console.log('Connected to db')
    }catch (error){
      console.error(error);
    }
  }

  module.exports = db