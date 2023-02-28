import React from 'react';
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
    const getTime = (time) =>(time / daySeconds) | 0;
    const daySeconds = 86400
    let todaysDate = Date.now() / 1000;
    const startTime = new Date(startDate).getTime() / 1000;
    const endTime = new Date(endDate).getTime() / 1000;
    const duration = endTime - startTime;
    const remainingTime = endTime - todaysDate;
    const elapsedTime = todaysDate - startDate;
    console.log(elapsedTime)
    console.log(`start time: ${startTime}`)
    console.log(`end time: ${endTime}`)
    console.log(`duration: ${duration}`);
    console.log(`remaining Time: ${remainingTime}`)
    const timerProps = {
    isPlaying: true,
    size: 500,
    strokeWidth: 10,
    };
  return (
    <div className='countdown-timer'>
        <CountdownCircleTimer
              {...timerProps}
              colors='#EAE8FF'
              duration={duration}
              initialRemainingTime= {remainingTime}
            >
            {({elapsedTime, color}) => (
                <span style={{color}}>
                    {/* {console.log(elapsedTime)} */}
                    {renderTime('days', getTime(duration - elapsedTime) )}
                </span>
            )}
            </CountdownCircleTimer>
    </div>
  )
}

export default Countdown
