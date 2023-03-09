import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setCycle, setIsBleeding, setNewPeriod, setUserInfo, setCanBleed, setPeriod} from '../../state';
import Moment from 'moment';
import axios from "axios";
import { useFetchUserInfo } from "../../hooks/fetchUserInfo";
import { useAvgPeriodLength, useEstimateDate} from "../../hooks/calcPeriodInfo"
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
  const token = useSelector((state) => state.token)
  const email = useSelector((state) => state.email)
  const isBleeding = useSelector((state) => state.isBleeding)
  const canBleed = useSelector((state) => state.canBleed)
  const [needInfo, setInfo] = useState(true)

  let todaysDate = new Date()
  todaysDate = Moment(todaysDate).format('YYYY-MM-DD')
  const user = useFetchUserInfo(email, token)
  const avgLengths = useAvgPeriodLength(previousPeriod)
  const estimateDate = useEstimateDate(periodStartDate, periodEndDate, previousPeriod, cycle, avgLength)
  const cycleStartDate = Moment(periodStartDate).subtract(cycle, 'days')
  const setUser = async (user, avgLengths, estimateDate) =>{
    const userInfo = await user;
    dispatch(
      setUserInfo({
        periodStartDate: userInfo.periodStartDate,
        periodEndDate: userInfo.periodEndDate,
        canBleed: userInfo.canBleed,
        isBleeding: userInfo.isBleeding,
        previousPeriod: userInfo.previousPeriod,
      })
    )
    if (avgLengths){
      const cycle = avgLengths.cycle;
      const avgLength = avgLengths.avgLength
      dispatch(
        setCycle({
          cycle: cycle,
          avgLength: avgLength
        })
      )
    }
    if (estimateDate){
      console.log(estimateDate)
      const startDate = Moment(estimateDate.startDate).format('YYYY-MM-DD');
      const endDate = Moment(estimateDate.endDate).format('YYYY-MM-DD');
      dispatch(
        setNewPeriod({
          periodStartDate: startDate,
          periodEndDate: endDate
        })
      )
      console.log(periodStartDate, periodEndDate)
      sendPeriodInfo(startDate, endDate)
    }
    setInfo(false)
    if (Moment(periodStartDate).format('YYYY-MM-DD') == todaysDate || Moment(periodStartDate).format('YYYY-MM-DD') < todaysDate){
      dispatch(
        setCanBleed({
          canBleed: true
        })
      )
    }
  }

  const sendPeriodInfo = async (startDate, endDate) =>{
    console.log('uwu')
    axios.post('http://localhost:8080/user/addperiod', {
      email, startDate, endDate, cycle, avgLength
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
  }
  
  const sendPeriodStatus = async () => {
    axios.post('http://localhost:8080/user/setperiodinfo',{
      email, isBleeding, canBleed
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
  }

  const sendPreviousPeriod = async () => {
    axios.post('http://localhost:8080/user/addpreviousperiod', {
      email, previousPeriod
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
  }

  const sendUpdatedPeriod = async (periodStartDate, periodEndDate) => {
    const test =axios.post('http://localhost:8080/user/updateperiod', {
      email, periodStartDate, periodEndDate
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
    console.log(test)
  }
const periodStarted = async () =>{
  console.log('clicked')
  if (periodStartDate != todaysDate){
    const newEndDate = Moment(todaysDate).add('days', avgLength).format('YYYY-MM-DD')
    sendUpdatedPeriod(todaysDate, newEndDate)
  }
  if (canBleed){
    dispatch(
      setCanBleed({
        canBleed: false
      })
    )
  }
  dispatch(
    setIsBleeding({
      isBleeding: true
    })
  )
}

const periodEnded = async () =>{
  if (periodEndDate != todaysDate){
    const newEndDate = Moment(todaysDate).add('days', avgLength).format('YYYY-MM-DD')
    dispatch(
      setPeriod({
        previousPeriod: [...previousPeriod,
          {startDate: periodStartDate, endDate: newEndDate}
        ]
      })
    )
    dispatch(
      setIsBleeding({
        isBleeding: false
      })
    )
  }else{
    dispatch(
      setPeriod({
        previousPeriod: [...previousPeriod,
          {startDate: periodStartDate, endDate: periodEndDate}
        ]
      })
    )
    dispatch(
      setIsBleeding({
        isBleeding: false
      })
    )
  }
}
useEffect(()=>{
  setUser(user,avgLengths, estimateDate)
},[cycle, periodStartDate, periodEndDate])

useEffect(() =>{
  sendPeriodStatus()
},[isBleeding, canBleed])

useEffect(() => {
  sendPreviousPeriod()
},[isBleeding])
// console.log(canBleed, isBleeding, periodStartDate, todaysDate)
// console.log(Moment(periodStartDate).format('YYYY-MM-DD') == todaysDate)
const home = (isBleeding, canBleed, needInfo) =>{
  if (!isBleeding && !canBleed && !needInfo){
    return <PeriodNotActive cycle = {cycle} userName = {userName} endDate = {periodStartDate} startDate = {cycleStartDate} onClick = {periodStarted} />
  } else if(canBleed){
    return <PeriodHere userName = {userName} onClick = {periodStarted} endDate = {periodStartDate} startDate = {todaysDate} />
  } else if(needInfo){
    return <NeedInfo userName = {userName} onClick = {null} message = 'More logs are required' />
  }else{
    return <PeriodActive userName = {userName} onClick = {periodEnded} endDate = {periodEndDate} startDate = {periodStartDate} />
  }
}

return home(isBleeding, canBleed, needInfo)

}
export default Home
