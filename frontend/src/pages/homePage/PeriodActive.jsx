import React from 'react';
import Nav from '../navbar/Nav';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const PeriodActive = (props) => {

  return (
        <section className="home">
            <Nav />
            <h1>Welcome back, {props.userName}</h1>
            <div className="placeholder"></div>
            <div className="period-countdown">
                <h2>Your period should be over in</h2>
            </div>
            <div className="check-period">
                <label htmlFor = 'check-period'>Has your period ended?</label>
                <button name='check-period' type='button' onClick={props.onClick}>Yes</button>
            </div>
        </section>
  )
}

export default PeriodActive
