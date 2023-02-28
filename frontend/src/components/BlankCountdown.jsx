import React from 'react';
import Moment from 'moment';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Countdown = (props) => {
    const renderTime = (message) =>{
        return(
            <div className='countdown-wrapper'>
                <div className='days-left'><span>{props.message}</span></div>
            </div>
        )
    }
    const timerProps = {
        isPlaying: true,
        size: 500,
        strokeWidth: 10
      }

  return (
    <div className='countdown-timer'>
        <CountdownCircleTimer
              {...timerProps}
              colors='#EAE8FF'
            >
            {({color}) => (
                <span style={{color}}>
                    {renderTime(props.message)}
                </span>
            )}
            </CountdownCircleTimer>
    </div>
  )
}

export default Countdown
