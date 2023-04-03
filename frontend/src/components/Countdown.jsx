import React, { useEffect, useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
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
    const [update, forceUpdate] = useReducer(x => x + 1, 0);
    const getTime = (time) =>Math.ceil((time / daySeconds));
    const daySeconds = 86400
    const startDate = Moment(props.startDate).format('YYYY-MM-DD')
    const endDate = Moment(props.endDate).format('YYYY-MM-DD')
    let todaysDate = Date.now() / 1000;
    const startTime = new Date(startDate).getTime() / 1000;
    const endTime = new Date(endDate).getTime() / 1000;
    const duration = endTime - startTime;
    const remainingTime = (endTime - todaysDate);
    const half = (duration/2)
    const quarter = (duration/4)
    const timerProps = {
    isPlaying: true,
    size: 500,
    strokeWidth: 10,
    };
  return (
    <div className='countdown-timer'>
        <CountdownCircleTimer
              {...timerProps}
              colors={[props.color1, props.color2, props.color3, props.color3]}
              colorsTime={[duration , half, quarter, 0]}
              duration={duration}
              initialRemainingTime={remainingTime}
            >
            {({elapsedTime ,color}) => (
                <span style={{color}}>
                    {renderTime('days', getTime(duration- (duration - remainingTime)))}
                </span>
            )}
            </CountdownCircleTimer>
    </div>
  )
}

export default Countdown
