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
    if(!periodStartDate || !periodEndDate){
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

export {avgPeriodLength, estimateDate}