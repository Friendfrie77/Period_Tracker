import React, { useEffect } from 'react';
import Moment from 'moment';
import { CountdownCircleTimer} from "react-countdown-circle-timer";


const renderTime = (dimension, time) =>{
    return(
        <div className='countdown-wrapper'>
            <div className='days-left'><span>{time}&nbsp;{dimension}</span></div>
        </div>
    )
}
const Countdown = (props) => {
    const startDate = Moment(props.startDate).format('YYYY-MM-DD')
    const endDate = Moment(props.endDate).format('YYYY-MM-DD')
    const getTime = (time) =>Math.ceil((time / daySeconds));
    const daySeconds = 86400
    const fiveDays = 432000
    let todaysDate = Date.now() / 1000;
    const startTime = new Date(startDate).getTime() / 1000;
    const endTime = new Date(endDate).getTime() / 1000;
    const duration = endTime - startTime;
    const remainingTime = endTime - todaysDate;
    const timerProps = {
    isPlaying: true,
    size: 500,
    strokeWidth: 10,
    };
    console.log(startDate, endDate)
  return (
    <div className='countdown-timer'>
        <CountdownCircleTimer
              {...timerProps}
              colors={[props.color1, props.color2, props.color3]}
              colorsTime={[startTime , fiveDays, 0]}
              duration={duration}
              initialRemainingTime= {remainingTime}
            >
            {({elapsedTime, color}) => (
                <span style={{color}}>
                    {renderTime('days', getTime(duration - elapsedTime) )}
                </span>
            )}
            </CountdownCircleTimer>
    </div>
  )
}

export default Countdown
