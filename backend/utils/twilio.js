const moment = require('moment');
const User = require('../mongoose-schmea/User');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
async function checkTextStatus(){
    const users = await User.find({notification: true})
    const todaysDate = new Date()
    for (let user in users){
        let dateTillBleed = new Date(users[user].periodStartDate)
        if(moment(dateTillBleed).diff(todaysDate,'day') <= 3){
            client.messages.create({
                body: `Your period is in ${moment(dateTillBleed).diff(todaysDate,'day')} days`,
                from: process.env.TWILIO_NUMBER,
                to: `${users[user].number}`
            })
        }
    }
}

module.exports = {checkTextStatus}