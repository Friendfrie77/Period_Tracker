import { useEffect, useState} from "react";
import {useSelector } from 'react-redux';
import Moment from 'moment';
import PeriodNotActive from "./PeriodNotActive";
import PeriodActive from "./PeriodActive";
import PeriodHere from "./PeriodHere";
import NeedInfo from "./NeedInfo";
import usePeriodInfo from "../../hooks/usePeriodInfo";
import Spinner from "../../components/Spinner";

const Home = () => {
  const userName = useSelector((state) => state.user)
  const avgLength = useSelector((state) => state.avgLength)
  const [needInfo, setInfo] = useState(true)
  const{sendPeriodStatus, updatePeriodStatus, freedomFromBloodGod, nullCurrentDates, cycleStartDate, todaysDate, cycle, periodStartDate, periodEndDate, canBleed, isBleeding, isLoading} = usePeriodInfo();

  console.log(isBleeding, canBleed)
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
  freedomFromBloodGod();
  updatePeriodStatus(false, false);
  nullCurrentDates();
}
const test = async () =>{
  nullCurrentDates();
}
useEffect(()=>{
  checkInfo()
},)

const home = (isBleeding, canBleed, needInfo) =>{
  if(isLoading){
    return <Spinner />
  }else if (!isBleeding && !canBleed && !needInfo){
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
