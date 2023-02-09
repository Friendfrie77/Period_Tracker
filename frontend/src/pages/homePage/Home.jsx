import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin, setCycle } from '../../state';
import Nav from '../navbar/Nav'
import Moment from 'moment';

const Home = () => {
  const dispatch = useDispatch();
  const cycle = useSelector((state) => state.cycle)
  const userName = useSelector((state) => state.user)
  const previousPeriod = useSelector((state) => state.previousPeriod)
  const [avgLength, setAvgLength] = useState(null) 
  const [isBleeding, setBleeding] = useState(false)
  const periodLogged = previousPeriod.length

  const avgPeriodLength = () =>{
    let totalDays = 0
    let startDate = null
    let totalCycle = 0
    previousPeriod.forEach(date => {
      totalDays = Moment(date.endDate).diff(date.startDate, 'days')
      if(startDate != null){
        console.log('peg owo')
        totalCycle = Moment(date.startDate).diff(startDate, 'days')
      }else{
        console.log('test')
        startDate = date.startDate;
      }
    })
    setAvgLength(Math.round(totalDays/periodLogged))
    dispatch(
      setCycle({
        cycle:(Math.round(totalCycle/periodLogged))
      })
    )
  }
  const estimateDate = () =>{
    let todaysDate = new Date()
    let lastPeriod = null
    todaysDate = Moment(todaysDate).format()
    previousPeriod.forEach(date => {
      if (lastPeriod === null){
        lastPeriod = date.startDate
      }else if(lastPeriod < date.startDate){
        lastPeriod = date.startDate
      }
    })
    
  }
  estimateDate()
  useEffect(()=>{
      avgPeriodLength()
  },[])
  console.log(cycle)
  return (
    <section className="home">
      <h1>Welcome back, {userName}</h1>
      <div className="placeholder"></div>
      <div className="period-countdown">
        <h2>Your next period is in</h2>
        <div className='inner-circle'>
          <span>5 days</span>
        </div>
      </div>
      <div className="check-period">
        <label htmlfor = 'check-period'>Has your period started?</label>
        <button name='check-period' type='button'>Yes</button>
      </div>
    </section>
  )
}

export default Home
