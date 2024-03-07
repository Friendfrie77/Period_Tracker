import React from 'react'
import Datestrip from '../../components/Datestrip';

function HomepageHeader(props) {
    console.log(props.periodStartDate, props.periodEndDate)
  return (
    <div className='homepage-header'>
        <h1>Welcome back {props.userName}</h1>
        {props.periodStartDate && props.periodEndDate ?(
            <Datestrip
            startValue = {props.periodStartDate}
            endValue = {props.periodEndDate}
            />
        ): null}
    </div>
  )
}

export default HomepageHeader
