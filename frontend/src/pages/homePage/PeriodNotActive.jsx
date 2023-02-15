import React from 'react';
import Nav from '../navbar/Nav';
import Countdown from '../../components/Countdown';

const PeriodNotActive = (props) => {
  return (
    <section className="home">
        <Nav cycle ={props.cycle}/>
        <h1>Welcome back, {props.userName}</h1>
        <div className="placeholder"></div>
        <div className="period-countdown">
            <h2>Your next period is in</h2>
            <Countdown startDate = {props.startDate} endDate = {props.endDate}></Countdown>
        </div>
        <div className="check-period">
            <label htmlFor = 'check-period'>Has your period started?</label>
            <button name='check-period' type='button' onClick={props.onClick}>Yes</button>
        </div>
    </section>
  )
}

export default PeriodNotActive
