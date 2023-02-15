import React from 'react'
import Nav from '../navbar/Nav'
import {useEffect, useState} from 'react';
import { DateRange } from 'react-date-range';
function PeriodInfo() {
  const [date, setDate] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);
  const content =
    <section className='page-wrapper'>
      <Nav />
      <div className='logging-period'>
        <h1>Do you have any more period(s) to log?</h1>
        <DateRange
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
          />
          <p>test</p>
      </div>
      <div className='remove-period'>
        <h2>Or would you like to remove some?</h2>
      </div>
    </section>

  return content;
}

export default PeriodInfo
