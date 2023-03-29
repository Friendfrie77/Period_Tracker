import { useEffect, useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { setCycle, setIsBleeding, setNewPeriod, setUserInfo, setCanBleed, setPeriod} from '../../state';
import Moment from 'moment';
import axios from "axios";
import { fetchUserInfo } from '../../utils/fetchUserInfo'
import { avgPeriodLength, estimateDate} from "../../utils/calcPeriodInfo";
import { countdownCalc } from "../../utils/countdowncalc";
import PeriodNotActive from "./PeriodNotActive";
import PeriodActive from "./PeriodActive";
import PeriodHere from "./PeriodHere";
import NeedInfo from "./NeedInfo";
import Countdown from "../../components/BlankCountdown";

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
  const cycleStartDate = Moment(periodStartDate).subtract(cycle, 'days')
  const setUser = async () =>{
    const userInfo = await fetchUserInfo(email, token)
    dispatch(
      setUserInfo({
        periodStartDate: userInfo.periodStartDate,
        periodEndDate: userInfo.periodEndDate,
        canBleed: userInfo.canBleed,
        isBleeding: userInfo.isBleeding,
        previousPeriod: userInfo.previousPeriod,
      })
    )
    const avgLengths = await avgPeriodLength(previousPeriod)
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
    const estimateDates = estimateDate(periodStartDate, periodEndDate, previousPeriod, cycle, avgLength)
    if (estimateDates){
      const startDate = estimateDates.startDate
      const endDate = estimateDates.endDate
      dispatch(
        setNewPeriod({
          periodStartDate: startDate,
          periodEndDate: endDate
        })
      )
      sendPeriodInfo(startDate, endDate)
    }
    setInfo(false)
    if (Moment(periodStartDate).format('YYYY-MM-DD') == todaysDate || Moment(periodStartDate).format('YYYY-MM-DD') < todaysDate && !isBleeding){
      dispatch(
        setCanBleed({
          canBleed: true
        })
      )
    }
  }
  const sendPeriodInfo = async (startDate, endDate) =>{
    axios.post(`${process.env.REACT_APP_APIURL}/user/addperiod`, {
      email, startDate, endDate, cycle, avgLength
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
  }
  
  const sendPeriodStatus = async () => {
    axios.post(`${process.env.REACT_APP_APIURL}/user/setperiodinfo`,{
      email, isBleeding, canBleed
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
  }

  const sendPreviousPeriod = async () => {
    axios.post(`${process.env.REACT_APP_APIURL}user/addpreviousperiod`, {
      email, previousPeriod
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
  }

  const sendUpdatedPeriod = async (periodStartDate, periodEndDate) => {
    const test =axios.post(`${process.env.REACT_APP_APIURL}/user/updateperiod`, {
      email, periodStartDate, periodEndDate
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
    return test
  }
const periodStarted = async () =>{
  if (Moment(periodStartDate).format('YYYY-MM-DD') != todaysDate){
    const newEndDate = Moment(todaysDate).add('days', avgLength).format('YYYY-MM-DD')
    const update = sendUpdatedPeriod(todaysDate, newEndDate)
    const bloodGod = await update
    dispatch(
      setCanBleed({
        canBleed: bloodGod.data.canBleed
      })
    )
    dispatch(
      setIsBleeding({
        isBleeding: bloodGod.data.isBleeding
      })
    )
  }else{
    const update = sendUpdatedPeriod(periodStartDate, periodEndDate)
    const bloodGod = await update
    dispatch(
      setCanBleed({
        canBleed: bloodGod.data.canBleed
      })
    )
    dispatch(
      setIsBleeding({
        isBleeding: bloodGod.data.isBleeding
      })
    )
  }
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
  setUser()
},[periodStartDate , periodEndDate, needInfo])  

// setUser(user,avgLengths, estimateDate)
// useEffect(() =>{
//   sendPeriodStatus()
// },[periodStarted])

// useEffect(() => {
//   sendPreviousPeriod()
// },[isBleeding])

const home = (isBleeding, canBleed, needInfo) =>{
  if (!isBleeding && !canBleed && !needInfo){
    return <PeriodNotActive cycle = {cycle} userName = {userName} endDate = {periodStartDate} startDate = {cycleStartDate} onClick = {periodStarted} periodStartDate={periodStartDate} periodEndDate = {periodEndDate}/>
  } else if(canBleed){
    return <PeriodHere userName = {userName} onClick = {periodStarted} endDate = {periodStartDate} startDate = {todaysDate} startValue={periodStartDate} endValue = {periodEndDate}/>
  } else if(needInfo){
    return <NeedInfo userName = {userName} onClick = {null} message = 'More logs are required' />
  }else{
    return <PeriodActive userName = {userName} onClick = {periodEnded} endDate = {periodEndDate} startDate = {periodStartDate} periodStartDate={periodStartDate} periodEndDate = {periodEndDate} />
  }
}

return home(isBleeding, canBleed, needInfo)

}
export default Home
