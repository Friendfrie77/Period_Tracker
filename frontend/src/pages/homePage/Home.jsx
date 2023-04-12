import { useEffect, useState} from "react";
import { useDispatch,useSelector } from 'react-redux';
import { setCycle, setIsBleeding, setNewPeriod, setUserInfo, setCanBleed, setPeriod, setPeriodStatus} from '../../state';
import Moment from 'moment';
import PeriodNotActive from "./PeriodNotActive";
import PeriodActive from "./PeriodActive";
import PeriodHere from "./PeriodHere";
import NeedInfo from "./NeedInfo";
import { sendPeriodStatus, sendUpdatedPeriod, sendPreviousPeriod, removeCurrentDates, sendPeriodInfo} from "../../utils/sendUserInfo";
import { fetchUserInfo } from '../../utils/fetchUserInfo'
import { avgPeriodLength, estimateDate} from "../../utils/calcPeriodInfo";

const Home = () => {
  const dispatch = useDispatch();
  const cycle = useSelector((state) => state.cycle)
  const userName = useSelector((state) => state.user)
  const periodEndDate = useSelector((state) => state.periodEndDate)
  const periodStartDate = useSelector((state) => state.periodStartDate)
  const avgLength = useSelector((state) => state.avgLength)
  const token = useSelector((state) => state.token)
  const email = useSelector((state) => state.email)
  const previousPeriod= useSelector((state) => state.previousPeriod)
  const [isBleeding, setBleeding] = useState(useSelector((state) => state.isBleeding))
  const [canBleed, setBleed] = useState(useSelector((state) => state.canBleed))
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
    console.log(avgLength)
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
    const estimateDates = await estimateDate(periodStartDate, periodEndDate, previousPeriod, avgLengths.cycle, avgLengths.avgLength)
    if (estimateDates){
      const startDate = Moment(estimateDates.startDate).format('YYYY-MM-DD')
      const endDate = Moment(estimateDates.endDate).format('YYYY-MM-DD')
      dispatch(
        setNewPeriod({
          periodStartDate: startDate,
          periodEndDate: endDate
        })
      )
      if(startDate && endDate){
        const test = await sendPeriodInfo(email, estimateDates.startDate, estimateDates.endDate, avgLengths.cycle, avgLengths.avgLength, token)
      }
    }
    setInfo(false)
    if ((Moment(periodStartDate).format('YYYY-MM-DD') === todaysDate) || (Moment(periodStartDate).format('YYYY-MM-DD') < todaysDate && !isBleeding)){
      dispatch(
        setCanBleed({
          canBleed: true
        })
      )
    }
  }

const periodStarted = async () =>{
  if (Moment(periodStartDate).format('YYYY-MM-DD') !== todaysDate){
    const newEndDate = Moment(todaysDate).add(avgLength, 'days').format('YYYY-MM-DD')
    const update = sendUpdatedPeriod(email, todaysDate, newEndDate, token)
    const bloodGod = await update
    dispatch(
      setPeriodStatus({
        canBleed: bloodGod.canBleed,
        isBleeding: bloodGod.isBleeding,
      })
    )
    setBleeding(true)
    }else{
      const update = sendPeriodStatus(email, true, false, token)
      const bloodGod = await update;
      dispatch(
        setPeriodStatus({
          canBleed: bloodGod.canBleed,
          isBleeding: bloodGod.isBleeding,
        })
      )
      setBleeding(true)
    }
}

const periodEnded = async () =>{
  if (periodEndDate !== todaysDate){
    dispatch(
      setPeriod({
        previousPeriod: [...previousPeriod,
          {startDate: periodStartDate, endDate: todaysDate}
        ]
      })
    )
    dispatch(
      setIsBleeding({
        isBleeding: false
      })
    )
    const newDates = {startDate: periodStartDate, endDate: todaysDate};
    sendPreviousPeriod(email, newDates, token)
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
    const newDates = {startDate: periodStartDate, endDate: periodEndDate}
    sendPreviousPeriod(email, newDates, token)
  }
  sendPeriodStatus(email, false, canBleed, token);
  removeCurrentDates(email, token);
  setBleeding(false);
}

useEffect(()=>{
  setUser()
},[isBleeding, periodStartDate])  

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
