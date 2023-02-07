import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLogin } from '../../state';
import Nav from '../navbar/Nav'
import Moment from 'moment';

const Home = () => {
  const cycle = useSelector((state) => state.cycle)
  const userName = useSelector((state) => state.user)
  console.log(userName)
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
