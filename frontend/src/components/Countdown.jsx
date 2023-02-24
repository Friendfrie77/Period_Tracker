import React from 'react';
import Moment from 'moment';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Countdown = (props) => {
    const renderTime = (dimension, time) =>{
        return(
            <div className='countdown-wrapper'>
                <div className='days-left'><span>{time}&nbsp;{dimension}</span></div>
            </div>
        )
    }
    const timerProps = {
        isPlaying: true,
        size: 500,
        strokeWidth: 10
      }
      const getTime = (time) => (time / daySeconds) | 0;
      const daySeconds = 86400
      let todaysDate = new Date()
      todaysDate = Moment(todaysDate).unix()
      const startTime = Moment(props.startDate).unix()
      const endTime = (Moment(props.endDate).unix())
      const remainingTime = endTime - startTime
      const days = Math.ceil(remainingTime / daySeconds)
      const dayDuration = days * daySeconds
      const test = endTime - todaysDate
      console.log(startTime, endTime, remainingTime, days, test)

  return (
    <div className='countdown-timer'>
        <CountdownCircleTimer
              {...timerProps}
              colors='#EAE8FF'
              duration = {dayDuration}
              initialRemainingTime = {test}
            >
            {({elapsedTime, color}) => (
                <span style={{color}}>
                    {renderTime('days', getTime(dayDuration - elapsedTime))}
                </span>
            )}
            </CountdownCircleTimer>
    </div>
  )
}

export default Countdown
