import React from 'react';
import Nav from '../navbar/Nav';
import Countdown from '../../components/Countdown';
import Footer from '../footer/Footer';
import HomepageHeader from '../../components/homePageName/HomepageHeader';

const PeriodNotActive = (props) => {
  return (
    <div className='page-wrapper'>
      <Nav/>
      <section className="home content">
          <HomepageHeader userName = {props.userName} periodStartDate = {props.periodStartDate} periodEndDate = {props.periodEndDate} />
          <div className="period-countdown">
              <h2>Your next period is in </h2>
              <Countdown startDate = {props.startDate} endDate = {props.endDate} color1='#40bf32' color2= '#e0e20c' color3= '#FA2C00' ></Countdown>
          </div>
          <div className="check-period">
              <label htmlFor = 'check-period'>Has your period started?</label>
              <button name='check-period' className='button' onClick={props.onClick}>Yes</button>
          </div>
      </section>
      <Footer />
    </div>
  )
}

export default PeriodNotActive
