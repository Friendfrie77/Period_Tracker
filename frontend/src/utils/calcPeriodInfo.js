import Moment from 'moment';

function avgPeriodLength(previousPeriod){
    let totalDays = 0
    let totalCycle = 0
    let oldStartDate = null;
    let cycleCount = 0
    const periodLogged = previousPeriod.length;
    if (periodLogged === 1){
        return (false)
    }
    previousPeriod.forEach(date => {
      totalDays += Moment(date.endDate).diff(date.startDate, 'days')
      if (oldStartDate != null){
        const monthDif = Moment(oldStartDate).diff(date.startDate, 'month', true);
        if (Math.abs(monthDif) < 1.5){
          totalCycle += Math.abs(Moment(date.startDate).diff(oldStartDate, 'days'))
          cycleCount += 1
        }
      }else{
        oldStartDate = Moment(date.startDate);
      }
    })
    const avgLength =(Math.round(totalDays/periodLogged))
    const cycle = (Math.round(totalCycle/cycleCount))
    return{avgLength, cycle}
}

function estimateDate(periodStartDate, periodEndDate, previousPeriod, cycle, avgLength){
    let lastPeriod = null
    let startDate;
    let endDate;
    let todaysDate = new Date()
    todaysDate = Moment(todaysDate).format()
    if((!periodStartDate || !periodEndDate) && previousPeriod && cycle && avgLength){
        previousPeriod.forEach(date => {
          if (lastPeriod === null){
            lastPeriod = date.startDate
          }else if(lastPeriod < date.startDate){
            lastPeriod = date.startDate
          }
        })
        const monthDif = Moment(todaysDate).diff(lastPeriod, 'month')
        if(cycle && avgLength){
          if( monthDif > 1){
            const estimateLastPeriod = Moment(lastPeriod).add((monthDif), 'months')
            startDate = Moment(estimateLastPeriod).add(cycle, 'days');
            endDate = Moment(estimateLastPeriod).add(avgLength, 'days');
          }else{
            lastPeriod = Moment(lastPeriod).format()
            startDate = Moment(lastPeriod).add(cycle, 'days');
            endDate = Moment(startDate).add(avgLength, 'days')
          }
        }
        return({startDate, endDate})
      }else{
        return(false)
      }
    }

    function countdownToPeriod(startDate, endDate){
      // const daySeconds = 86400
      // const fiveDays = 432000
      let todaysDate = Date.now() / 1000;
      const startDay = Moment(startDate).format('YYYY-MM-DD')
      const endDay = Moment(endDate).format('YYYY-MM-DD')
      const startTime = new Date(startDay).getTime() / 1000;
      const endTime = new Date(endDay).getTime() / 1000;
      const duration = endTime - startTime;
      const remainingTime = endTime - todaysDate;
      return{startTime, duration, remainingTime}
    }
// function countdownCalc(startDate, endDate){
//   const daySeconds = 86400;
//   const fiveDays = 432000;
//   let todaysDate = Date.now() / 1000;
//   if(startDate && endDate){
    // const startDay = Moment(startDate).format('YYYY-MM-DD')
    // const endDay = Moment(endDate).format('YYYY-MM-DD')
    // const startTime = new Date(startDay).getTime() / 1000;
    // const endTime = new Date(endDay).getTime() / 1000;
    // const duration = endTime - startTime;
    // const remainingTime = endTime - todaysDate;
    // return {duration, remainingTime}
//   }else{
//     return false
//   }
// }
export {avgPeriodLength, estimateDate, countdownToPeriod}