import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setCycle, setNewPeriod, setUserInfo} from '../../state';
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
  const periodLogged = previousPeriod.length
  const [daysTillPeriod, setDays ] = useState(null)
  const [needInfo, setInfo] = useState(true)

  let todaysDate = new Date()
  todaysDate = Moment(todaysDate).format()
  const user = useFetchUserInfo(email, token)
  const avgLengths = useAvgPeriodLength(previousPeriod)
  const estimateDate = useEstimateDate(periodStartDate, periodEndDate, previousPeriod, cycle, avgLength)
  const setUser = async (user, avgLengths, estimateDate) =>{
    const userInfo = await user;
    const cycle = avgLengths.cycle;
    const avgLength = avgLengths.avgLength
    dispatch(
      setUserInfo({
        periodStartDate: userInfo.periodStartDate,
        periodEndDate: userInfo.periodEndDate,
        previousPeriod: userInfo.previousPeriod
      })
    )
    dispatch(
      setCycle({
        cycle: cycle,
        avgLength: avgLength
      })
    )
    // console.log(estimateDate)
    if (estimateDate){
      const startDate = Moment(estimateDate.startDate).format();
      const endDate = Moment(estimateDate.endDate).format();
      // console.log(startDate, endDate)
    }
  }

  // console.log(previousPeriod, estimateDate)
  const countdownTimer = (Moment(periodStartDate).unix() - Moment(todaysDate).unix())
  useEffect(()=>{
    setUser(user,avgLengths)
  },[cycle, periodStartDate])
  // console.log(cycle, avgLength, needInfo)
  // console.log(periodStartDate, periodEndDate)

  const sendPeriodInfo = async (dates) =>{
    const startDate = Moment(dates.startDate).format()
    const endDate = Moment(dates.endDate).format()
    axios.post('http://localhost:8080/user/addperiod', {
      email, startDate, endDate, cycle, avgLength
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
  }

const aa = Moment(periodStartDate).subtract(cycle, 'days')
// console.log(aa)
// console.log(countdownTimer)
const home = (isBleeding, canBleed) =>{
  if (!isBleeding && !canBleed){
    return <PeriodNotActive cycle = {cycle} userName = {userName} endDate = {periodStartDate} startDate = {aa} onClick = {null} />
  } else if(canBleed){
    return <PeriodHere userName = {userName} onClick = {null} endDate = {periodStartDate} startDate = {todaysDate} />
  } else if(needInfo){
    return <NeedInfo userName = {userName} onClick = {null} message = 'More logs are required' />
  }else{
    return <PeriodActive userName = {userName} onClick = {null} endDate = {periodEndDate} startDate = {periodStartDate} />
  }
}

return home(isBleeding, canBleed)

}
export default Home
