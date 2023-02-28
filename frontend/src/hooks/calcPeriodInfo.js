import Moment from 'moment';
import { useDispatch } from 'react-redux';
import { setCycle, setDays, setCanBleed} from '../state';

function useAvgPeriodLength(previousPeriod){
    const dispatch = useDispatch();
    let totalDays = 0
    let totalCycle = 0
    let oldStartDate = null;
    let cycleCount = 0
    const periodLogged = previousPeriod.length;
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

function useEstimateDate(periodStartDate, periodEndDate, previousPeriod, cycle, avgLength){
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

    // const daysTill = (isBleeding) =>{
    //     let todaysDate = new Date()
    //     todaysDate = Moment(todaysDate).format()
    //     const dispatch = useDispatch();
    //     let daysLeft;
    //     if (isBleeding){
    //       daysLeft = Moment(periodEndDate).diff(todaysDate, 'days')
    //     }else{
    //       daysLeft = Moment(periodStartDate).diff(todaysDate, 'days')
    //     }
    //     dispatch(
    //         setDays({
    //             daysLeft: daysLeft
    //         })
    //     )
    //   }

export {useAvgPeriodLength, useEstimateDate}