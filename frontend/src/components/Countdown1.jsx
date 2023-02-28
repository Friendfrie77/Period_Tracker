import Moment from 'moment';
import { useEffect, useState } from "react";
import { CountdownCircleTimer, useCountdown } from "react-countdown-circle-timer";
import { useSelector } from "react-redux";

const renderTime = (dimension, time) =>{
    return(
        <div className='countdown-wrapper'>
            <div className='days-left'><span>{time}&nbsp;{dimension}</span></div>
        </div>
    )
}
const Countdown = (props) => {
    const [key, setKey] = useState(0)
    // const [startDate,setStart] = useState(Moment(props.startDate).format('YYYY-MM-DD'));
    // const [endDate, setEnd] = useState(Moment(props.endDate).format('YYYY-MM-DD'));
    // setStart(Moment(props.startDate).format('YYYY-MM-DD'));
    // setEnd(Moment(props.endDate).format('YYYY-MM-DD'))
    const startDate = Moment(props.startDate).format('YYYY-MM-DD')
    const endDate = Moment(props.endDate).format('YYYY-MM-DD')
    console.log(startDate, endDate)
    // const renderTime = (dimension, time) =>{
    //     return(
    //         <div className='countdown-wrapper'>
    //             <div className='days-left'><span>{time}&nbsp;{dimension}</span></div>
    //         </div>
    //     )
    // }
      const getTime = (time) =>(time / daySeconds) | 0;
      const daySeconds = 86400
      let todaysDate = Date.now() / 1000;
    //   console.log(end,start)
    //   const stratTime =  new Date(start) / 1000
    //   const endTime1 = new Date(end) / 1000; // use UNIX timestamp in seconds
    //   const remainingTime = endTime1 - stratTime;
    //   const elapsedTime = endTime1 - todaysDate
      const startTime = new Date(startDate).getTime() / 1000;
      const endTime = new Date(endDate).getTime() / 1000;
      const remainingTime = endTime - startTime;
      const elapsedTime = endTime - todaysDate;
    //   console.log(`start1 time ${stratTime}`)
    //   console.log(`end1 time: ${endTime1}`)
      console.log(`start time: ${startTime}`)
      console.log(`end time: ${endTime}`)
      console.log(`remaining time: ${remainingTime}`);
      console.log(`elapsed Time: ${elapsedTime}`)
      const timerProps = {
        isPlaying: true,
        size: 500,
        strokeWidth: 10,
      };
  return (
    <div className='countdown-timer'>
        <CountdownCircleTimer
              {...timerProps}
              key = {key}
              colors='#EAE8FF'
              duration={remainingTime}
              initialRemainingTime= {elapsedTime}
              elapsedTime = {1831981}
            >
            {({elapsedTime, color}) => (
                <span style={{color}}>
                    {console.log(elapsedTime)}
                    {renderTime('days', getTime(remainingTime - elapsedTime) )}
                </span>
            )}
            </CountdownCircleTimer>
    </div>
  )
}

export default Countdown
