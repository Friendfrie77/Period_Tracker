import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setCycle, setIsBleeding, setNewPeriod, setUserInfo, setCanBleed} from '../../state';
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
    console.log(canBleed, isBleeding)
    if (avgLengths){
      const cycle = avgLengths.cycle;
      const avgLength = avgLengths.avgLength
      dispatch(
        setCycle({
          cycle: cycle,
          avgLength: avgLength
        })
      )
    } else{
      return (false)
    }
    if (estimateDate){
      const startDate = Moment(estimateDate.startDate).format('YYYY-MM-DD');
      const endDate = Moment(estimateDate.endDate).format('YYYY-MM-DD');
      dispatch(
        setNewPeriod({
          periodStartDate: startDate,
          periodEndDate: endDate
        })
      )
      sendPeriodInfo(startDate, endDate)
    }
    setInfo(false)
    if (periodStartDate == todaysDate || periodStartDate < todaysDate){
      dispatch(
        setCanBleed({
          canBleed: true
        })
      )
    }
  }

  useEffect(()=>{
    setUser(user,avgLengths, estimateDate)
  },[cycle, periodStartDate, isBleeding, canBleed])

  const sendPeriodInfo = async (startDate, endDate) =>{
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
const periodStarted = () =>{
  if (periodStartDate != todaysDate){
    const newEndDate = Moment(todaysDate).add('days', avgLength).format('YYYY-MM-DD')
    dispatch(
      setNewPeriod({
        periodStartDate: todaysDate,
        periodEndDate: newEndDate
      })
    )
  }
  dispatch(
    setIsBleeding({
      isBleeding: true
    })
  )
  if (canBleed){
    dispatch(
      setCanBleed({
        canBleed: false
      })
    )
  }
  sendPeriodStatus()
  console.log('clicked')
}
const aa = Moment(periodStartDate).subtract(cycle, 'days')
const home = (isBleeding, canBleed, needInfo) =>{
  if (!isBleeding && !canBleed && !needInfo){
    return <PeriodNotActive cycle = {cycle} userName = {userName} endDate = {periodStartDate} startDate = {aa} onClick = {periodStarted} />
  } else if(canBleed){
    return <PeriodHere userName = {userName} onClick = {periodStarted} endDate = {periodStartDate} startDate = {todaysDate} />
  } else if(needInfo){
    return <NeedInfo userName = {userName} onClick = {null} message = 'More logs are required' />
  }else{
    return <PeriodActive userName = {userName} onClick = {null} endDate = {periodEndDate} startDate = {periodStartDate} />
  }
}

return home(isBleeding, canBleed, needInfo)

}
export default Home
