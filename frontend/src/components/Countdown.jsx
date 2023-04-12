import React, { useEffect, useState} from 'react';
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
    const [timerKey, setTimerKey] = useState(0)
    const getTime = (time) => Math.ceil((time / daySeconds));
    const daySeconds = 86400
    let todaysDate = Date.now() / 1000;
    const startTime = new Date(props.startDate).getTime() / 1000;
    const endTime = new Date(props.endDate).getTime() / 1000;
    const duration = endTime - startTime;
    const remainingTime = Math.ceil(endTime - todaysDate);
    console.log(remainingTime)
    const half = (duration/2)
    const quarter = (duration/4)
    const timerProps = {
    isPlaying: true,
    size: 500,
    strokeWidth: 10,
    };
    useEffect(() =>{
        setTimerKey(prev => prev + 1)
    },[props.endDate])
  return (
    <div className='countdown-timer'>
        <CountdownCircleTimer
              {...timerProps}
              key= {timerKey}
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