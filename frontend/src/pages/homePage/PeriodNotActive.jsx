import React from 'react';
import Nav from '../navbar/Nav';
import Countdown from '../../components/Countdown';
import Datestrip from '../../components/Datestrip';
import Footer from '../footer/Footer';

const PeriodNotActive = (props) => {
  return (
    <div className='page-wrapper'>
      <Nav/>
      <section className="home content">
          <h1>Welcome back, {props.userName}</h1>
          <Datestrip
                  startValue = {props.periodStartDate}
                  endValue = {props.periodEndDate}
            />
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
