import React from 'react';
import Moment from 'moment';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Countdown = (props) => {
    const renderTime = (dimension, time) =>{
        return(
            <div className='countdown-wrapper'>
                <div className='days-left'>{time}&nbsp;{dimension}</div>
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
      const startTime = Moment(props.periodStartDate).unix() 
      const endTime = (Moment(props.periodEndDate).unix()) 
      const remainingTime = endTime - startTime
      const days = remainingTime / daySeconds
      const dayDuration = days * daySeconds

  return (
    <div className='countdown-timer'>
        <CountdownCircleTimer
              {...timerProps}
              colors='#EAE8FF'
              duration = {dayDuration}
              initialRemaingTime = {remainingTime}
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
