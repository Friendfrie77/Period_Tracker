const moment = require('moment');

const todaysDate = new Date();

let [cycle, avgLength] = [25, 5];
let guestPeriodInfo = []
const addRandomDays = (dayToAdd, num) =>{
    const numToAdd =  Math.floor(Math.random() * num );
    return dayToAdd + numToAdd
}
const genPrevPeriod = (guestPeriodInfo) =>{
    let lastPeriodStartDate, lastPeriodEndDate;
    let daysAway = addRandomDays(14, 3);
    daysAway = cycle - daysAway
    const randomLength = addRandomDays(avgLength, 4);
    const randomCylce = addRandomDays(cycle, 5);

    if(guestPeriodInfo.length === 0){
        lastPeriodStartDate = moment(todaysDate).subtract(daysAway, 'days').format('YYYY-MM-DD')
        lastPeriodEndDate = moment(lastPeriodStartDate).add(randomLength, 'days').format('YYYY-MM-DD')
    }else{
        const lastArr = guestPeriodInfo[guestPeriodInfo.length - 1]
        lastPeriodStartDate = moment(lastArr.endDate).subtract(randomCylce, 'days').format('YYYY-MM-DD')
        // lastPeriodStartDate = moment(lastPeriodStartDate).subtract((guestPeriodInfo.length - 1), 'month').format('YYYY-MM-DD')
        lastPeriodEndDate = moment(lastPeriodStartDate).add(randomLength, 'days').format('YYYY-MM-DD')
    }
    return {startDate: lastPeriodStartDate, endDate: lastPeriodEndDate}
}

const genAllPeriods = (guestPeriodInfo, numPeriodsToGen) =>{
    if(numPeriodsToGen < 0){
        return guestPeriodInfo;
    }else{
        const periodInfo = genPrevPeriod(guestPeriodInfo);
        guestPeriodInfo.push(periodInfo)
        return genAllPeriods(guestPeriodInfo, numPeriodsToGen - 1)
    }
}
// genAllPeriods(guestPeriodInfo, 5);
// console.log(guestPeriodInfo)
module.exports = {genAllPeriods}