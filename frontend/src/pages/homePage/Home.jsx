import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCycle, setNewPeriod, setUserInfo } from '../../state';
import Moment from 'moment';
import axios from "axios";
import PeriodNotActive from "./PeriodNotActive";
import PeriodActive from "./PeriodActive";
import PeriodHere from "./PeriodHere";
import NeedInfo from "./NeedInfo";

const Home = () => {
  const dispatch = useDispatch();
  const cycle = useSelector((state) => state.cycle)
  const userName = useSelector((state) => state.user)
  const previousPeriod = useSelector((state) => state.previousPeriod)
  const periodEndDate = useSelector((state) => state.periodEndDate)
  const periodStartDate = useSelector((state) => state.periodStartDate)
  const avgLength = useSelector((state) => state.avgLength)
  const token = useSelector((state) => (state.token))
  const email = useSelector((state) => state.email)
  const [canBleed, setBleed] = useState(false)
  const [isBleeding, setBleeding] = useState(false)
  const periodLogged = previousPeriod.length
  const [daysTillPeriod, setDays ] = useState(null)
  const [needInfo, setInfo] = useState(true)

  let todaysDate = new Date()
  todaysDate = Moment(todaysDate).format()
  const fetchUserInfo = async () =>{
    const result = axios.post('http://localhost:8080/user/getuserinfo',{
      email
      },{
        headers: {'Authorization': `Bearer ${token}`},
      }
    )
    const user = await result
    if (user){
      dispatch(
        setUserInfo({
          periodStartDate: user.data.user.periodStartDate,
          avgLength: user.data.user.avgLength,
          cycle: user.data.user.cycle,
          periodEndDate: user.data.user.periodEndDate,
          previousPeriod: user.data.user.previousPeriod
        })
      )
    }
  }

  const avgPeriodLength = () =>{
    let totalDays = 0
    let totalCycle = 0
    let oldStartDate = null;
    let cycleCount = 0
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
    dispatch(
      setCycle({
        cycle: cycle,
        avgLength: avgLength
      })
    )
  }
  const estimateDate = () =>{
    let lastPeriod = null
    let startDate;
    let endDate;
    todaysDate = Moment(todaysDate).format()
    if(!periodStartDate && !periodStartDate){
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
          endDate = Moment(estimateLastPeriod).add(avgLength, 'days')
        }else{
          lastPeriod = Moment(lastPeriod).format()
          startDate = Moment(lastPeriod).add(cycle, 'days');
          endDate = Moment(startDate).add(avgLength, 'days')
        }
      }
      if(Moment(startDate).diff(todaysDate, 'day') == 0 && Moment(endDate).diff(todaysDate, 'day') >= 0 && startDate){
        setBleed (true)
      }
      return({startDate, endDate})
    }else if(Moment(periodStartDate).diff(todaysDate, 'day') == 0 && startDate){
      setBleed(true)
    }
  }
  const sendPeriodInfo = async (dates) =>{
    const startDate = Moment(dates.startDate).format()
    const endDate = Moment(dates.endDate).format()
    axios.post('http://localhost:8080/user/addperiod', {
      email, startDate, endDate, cycle, avgLength
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
  }
  const daysTill = () =>{
    todaysDate = Moment(todaysDate).format()
    let daysLeft;
    console.log('in days till')
    if (isBleeding){
      daysLeft = Moment(periodEndDate).diff(todaysDate, 'days')
    }else{
      console.log('else')
      daysLeft = Moment(periodStartDate).diff(todaysDate, 'days')
      console.log(daysLeft)
    }
    setDays(daysLeft)
  }

  const periodStarted = async () =>{
    let startDate;
    let endDate;
    if (!isBleeding){
      startDate = Moment(todaysDate).format()
      endDate = Moment(startDate).add(avgLength,'days')
      daysTill()
    }else{
      startDate = periodStartDate
      endDate = Moment(todaysDate).format()
    }
    dispatch(
      setNewPeriod({
        periodStartDate: Moment(startDate).format(),
        periodEndDate: Moment(endDate).format()
      })
    )
    await axios.post('http://localhost:8080/user/addperiod', {
      email, startDate, endDate
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
  }
  
  const periodEnded = async () =>{
    let endDate; 
    const startDate = Moment(todaysDate).format();
    endDate = Moment(startDate).add(avgLength, 'days')

  }
  const pageLoad = () =>{
    const userInfo = fetchUserInfo()
    if(userInfo){
      avgPeriodLength()
      const dates = estimateDate()
      if (dates && cycle && avgLength){
        console.log('sending info')
        sendPeriodInfo(dates)
      }
      console.log('before days till')
      if (periodStartDate){
        daysTill()
      }
      if (cycle && avgLength && periodStartDate){
        console.log('in set info')
        setInfo(false)
      }
    }
  }
  useEffect(()=>{
    pageLoad()
  },[periodStartDate])
  console.log(cycle, avgLength, daysTillPeriod, needInfo)
  console.log(periodStartDate, periodEndDate)
const home = (isBleeding, daysTillPeriod, canBleed) =>{
  if (!isBleeding && !canBleed){
    return <PeriodNotActive cycle = {cycle} userName = {userName} endDate = {periodStartDate} startDate = {Moment(periodStartDate).subtract(cycle, 'days')} onClick = {periodStarted} />
  } else if(canBleed){
    return <PeriodHere userName = {userName} onClick = {periodStarted} endDate = {periodStartDate} startDate = {todaysDate} />
  } else if(needInfo){
    return <NeedInfo userName = {userName} onClick = {periodStarted} message = 'More logs are required' />
  }else{
    return <PeriodActive userName = {userName} daysTillPeriod = {daysTillPeriod} onClick = {periodEnded} endDate = {periodEndDate} startDate = {periodStartDate} />
  }
}

return home(isBleeding, daysTillPeriod,canBleed)

}
export default Home
