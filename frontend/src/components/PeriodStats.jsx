import React from 'react'
import { useSelector } from "react-redux";
function PeriodStats() {
    const previousPeriod = useSelector((state) => state.previousPeriod)
    const cycle = useSelector((state) =>state.cycle)
    const avgLength = useSelector((state) => state.avgLength)
  return (
    <div className='on-page-stats'>
          <h3>Your period stats:</h3>
          <span>Average cycle length: {cycle} days</span>
          <span>Average Length: {avgLength} days </span>
          <span>Periods Logged: {previousPeriod.length}</span>
    </div>
  )
}

export default PeriodStats
