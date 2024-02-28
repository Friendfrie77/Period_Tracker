import { useEffect, useState} from "react";
import { useDispatch,useSelector } from 'react-redux';
import { setCycle, setIsBleeding, setNewPeriod, setUserInfo, setCanBleed, setPeriod, setPeriodStatus} from '../../state';
import Moment from 'moment';
import PeriodNotActive from "./PeriodNotActive";
import PeriodActive from "./PeriodActive";
import PeriodHere from "./PeriodHere";
import NeedInfo from "./NeedInfo";
import usePeriodInfo from "../../hooks/usePeriodInfo";

const Home = () => {

  const dispatch = useDispatch();
  const cycle = useSelector((state) => state.cycle)
  const userName = useSelector((state) => state.user)
  const periodEndDate = useSelector((state) => state.periodEndDate)
  const periodStartDate = useSelector((state) => state.periodStartDate)
  const avgLength = useSelector((state) => state.avgLength)
  const [isBleeding, setBleeding] = useState(useSelector((state) => state.isBleeding))
  const [canBleed, setBleed] = useState(useSelector((state) => state.canBleed))
  const [needInfo, setInfo] = useState(true)
  console.log(isBleeding, canBleed);
  const{sendPeriodStatus, updatePeriodStatus,cycleStartDate, todaysDate} = usePeriodInfo();

  // let todaysDate = new Date()
  // todaysDate = Moment(todaysDate).format('YYYY-MM-DD')
  // const cycleStartDate = Moment(periodStartDate).subtract(cycle, 'days')
  const checkInfo = () => {
    if (periodStartDate && periodEndDate){
      setInfo(false)
    }
  }

const periodStarted = async () =>{
  if (Moment(periodStartDate).format('YYYY-MM-DD') !== todaysDate){
    const newEndDate = Moment(todaysDate).add(avgLength, 'days').format('YYYY-MM-DD')
    sendPeriodStatus(newEndDate);
    }else{
      updatePeriodStatus(true, false)
    }
}

const periodEnded = async () =>{
  // if (periodEndDate !== todaysDate){
  //   dispatch(
  //     setPeriod({
  //       previousPeriod: [...previousPeriod,
  //         {startDate: periodStartDate, endDate: todaysDate}
  //       ]
  //     })
  //   )
  //   dispatch(
  //     setIsBleeding({
  //       isBleeding: false
  //     })
  //   )
  //   const newDates = {startDate: periodStartDate, endDate: todaysDate};
  //   sendPreviousPeriod(email, newDates, token)
  // }else{
  //   dispatch(
  //     setPeriod({
  //       previousPeriod: [...previousPeriod,
  //         {startDate: periodStartDate, endDate: periodEndDate}
  //       ]
  //     })
  //   )
  //   dispatch(
  //     setIsBleeding({
  //       isBleeding: false
  //     })
  //   )
  //   const newDates = {startDate: periodStartDate, endDate: periodEndDate}
  //   sendPreviousPeriod(email, newDates, token)
  // }
  // sendPeriodStatus(email, false, canBleed, token);
  // removeCurrentDates(email, token);
  // setBleeding(false);
}
useEffect(()=>{
  checkInfo()
},)

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
