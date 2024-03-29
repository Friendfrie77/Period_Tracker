import React from 'react'
import Nav from '../navbar/Nav'
import BlankCountdown from '../../components/BlankCountdown';
import Datestrip from '../../components/Datestrip';
import Footer from '../footer/Footer';

const PeriodHere = (props) => {
    return (
        <div className='page-wrapper'>
            <Nav />
            <section className="home content">
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
                    <button name='check-period' type='button' onClick={props.onClick} className='button'>Yes</button>
                </div>
            </section>
            <Footer />
        </div>
      )
}

export default PeriodHere
