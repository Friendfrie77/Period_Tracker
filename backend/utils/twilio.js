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
        let isBleeding = users[user].isBleeding
        let canBleed = users[user].canBleed
        if(moment(dateTillBleed).diff(todaysDate,'day') <= 3 && (!isBleeding)){
            client.messages.create({
                body: `Your period is in ${moment(dateTillBleed).diff(todaysDate,'day')} days`,
                from: process.env.TWILIO_NUMBER,
                to: `${users[user].number}`
            })
        }
        if(moment(dateTillBleed).diff(todaysDate, 'day') == 0 && (canBleed)){
            client.messages.create({
                body: 'Your period might be here today.',
                from: process.env.TWILIO_NUMBER,
                to: `${users[user].number}`
            })
        }
    }
}

async function sendNotification(username, number){
    client.messages.create({
        body: `Thank you ${username} for signing up for text notifications. You will get a notfication 3 days before your period starts. You can turn them off anytime in settings.`,
        from: process.env.TWILIO_NUMBER,
        to: `${number}`
    })
}

module.exports = {checkTextStatus, sendNotification}