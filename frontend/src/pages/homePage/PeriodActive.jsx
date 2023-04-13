import React, {useEffect, useReducer} from 'react';
import Nav from '../navbar/Nav';
import Countdown from '../../components/Countdown';
import Datestrip from '../../components/Datestrip';
import Footer from '../footer/Footer';

const PeriodActive = (props) => {
  const [update, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() =>{
    forceUpdate()
  }, [props.startDate, props.endDate, props.periodStartDate, props.periodEndDate])
  return (
    <div className='page-wrapper'>
        <Nav />
        <section className='home content'>
            <h1 className='welcome-text'>Welcome back, {props.userName}</h1>
            <Datestrip
                startValue = {props.periodStartDate}
                endValue = {props.periodEndDate}
            />
            <div className="period-countdown">
                <h2>Your period should be over in</h2>
                <Countdown startDate = {props.startDate} endDate = {props.endDate} color1='#40bf32' color2= '#e0e20c' color3= '#FA2C00'></Countdown>
            </div>
            <div className="check-period">
                    <label htmlFor = 'check-period'>Has your period ended?</label>
                    <button name='check-period' type='button' onClick={props.onClick} className='button'>Yes</button>
            </div>
        </section>
        <Footer />
    </div>
  )
}

export default PeriodActive
