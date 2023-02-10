import React from 'react';
import Nav from '../navbar/Nav';

const PeriodActive = (props) => {
  return (
    <div className='page-wrapper'>
        <Nav />
        <section className="home">
            <h1>Welcome back, {props.userName}</h1>
            <div className="placeholder"></div>
            <div className="period-countdown">
                <h2>Your period should be over in</h2>
                <div className='inner-circle'>
                <span>{props.daysTillPeriod} days</span>
                </div>
            </div>
            <div className="check-period">
                <label htmlFor = 'check-period'>Has your period started?</label>
                <button name='check-period' type='button' onClick={props.onClick}>Yes</button>
            </div>
        </section>
    </div>
  )
}

export default PeriodActive
