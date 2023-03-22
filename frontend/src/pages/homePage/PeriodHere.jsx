import React from 'react'
import Nav from '../navbar/Nav'
import BlankCountdown from '../../components/BlankCountdown';
import Datestrip from '../../components/Datestrip';

const PeriodHere = (props) => {
    return (
        <div className='page-wrapper'>
            <Nav />
            <section className="home">
            <h1>Welcome back, {props.userName}</h1>
            <Datestrip
                startValue = {props.periodStartDate}
                endValue = {props.periodEndDate}
            />
            <div className="period-countdown">
                <h2>Your period might be here</h2>
                <div className='inner-circle'>
                    <BlankCountdown startDate = {props.startDate} endDate = {props.endDate}></BlankCountdown>
                <span>Today</span>
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

export default PeriodHere
