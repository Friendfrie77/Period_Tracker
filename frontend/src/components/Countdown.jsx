import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { CountdownCircleTimer} from "react-countdown-circle-timer";
import { fetchUserInfo } from '../utils/fetchUserInfo';


const renderTime = (dimension, time) =>{
    return(
        <div className='countdown-wrapper'>
            <div className='days-left'><span>{time}&nbsp;{dimension}</span></div>
        </div>
    )
}
const Countdown = (props) => {
    const isBleeding = useSelector((state) => state.isBleeding)
    const cycle = useSelector((state) => state.cycle)
    const token = useSelector((state) => state.token)
    const email = useSelector((state) => state.email)
    const load = async (startDate, endDate) =>{
        if(!startDate || !endDate){
            const user = await fetchUserInfo(email, token)
            console.log(user)
        }
    }
    load(props.startDate, props.endDate)
    const [pageLoaded, setPageLoad] = useState(true)
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
