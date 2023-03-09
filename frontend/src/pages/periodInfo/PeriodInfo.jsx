import React from 'react'
import Nav from '../navbar/Nav'
import Footer from '../footer/Footer';
import {useEffect, useState} from 'react';
import { DateRange } from 'react-date-range';
import { useSelector } from "react-redux";
import Moment from 'moment';
function PeriodInfo() {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(''),
      key: 'selection'
    }
  ]);
  const previousPeriod = useSelector((state) => state.previousPeriod)
  const removePeriod = () =>{
    
  }
  const content =
    <div className='page-wrapper'>
      <Nav />
      <div className='logging-period'>
        <h1>Do you have any more period(s) to log?</h1>
        <DateRange
            editableDateInputs={true}
            showMonthAndYearPickers={false}
            fixedHeight = {true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            // scroll = {{enabled: true}}
          />
      </div>
      <div className='remove-period'>
        <h2>Or would you like to remove some?</h2>
        <fieldset>
          <label htmlFor = 'periods'>Select a period to remove:</label>
          <select name='periods' className='periods'>
            <option disabled selected>Select a date</option>
            {previousPeriod.map((date, key) => <option value={key} key={date + key}>{`${Moment(date.startDate).format('MMMM Do YYYY')} - ${Moment(date.endDate).format('MMMM Do YYYY')}`}</option>
            )}
          </select>
        </fieldset>
        <button onClick={removePeriod}>Remove</button>
      </div>
      <Footer />
    </div>

  return content;
}

export default PeriodInfo
