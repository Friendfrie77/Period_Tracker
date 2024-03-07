import React from 'react'
import Nav from '../navbar/Nav'
import BlankCountdown from '../../components/BlankCountdown';
import Footer from '../footer/Footer';
import HomepageHeader from '../../components/homePageName/HomepageHeader';

const PeriodHere = (props) => {
    return (
        <div className='page-wrapper'>
            <Nav />
            <section className="home content">
            <HomepageHeader userName = {props.userName} periodStartDate = {props.periodStartDate} periodEndDate = {props.periodEndDate} />
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
