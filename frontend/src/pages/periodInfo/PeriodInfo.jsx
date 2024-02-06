import React from 'react'
import Nav from '../navbar/Nav'
import Footer from '../footer/Footer';
import {useEffect, useState} from 'react';
import { DateRange } from 'react-date-range';
import usePeriodInfo from '../../hooks/usePeriodInfo';
import { useSelector, useDispatch } from "react-redux";
import Moment from 'moment';
import axios from 'axios';
import { setPeriod } from '../../state';


function PeriodInfo() {
  const userInfo =useSelector((state) => state.previousPeriod)
  const [removeDate, setRemove] = useState(null)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [loggedPeriods, setLoggedPeriods] =useState([])
  const {removePeriod, addPeriod, message, periodMessage} = usePeriodInfo()

  const optionChange = (event) =>{
    setRemove(event.target.value)
  }
  const removePeriodButton = () =>{
    removePeriod(removeDate)
  }
  const addPeriodButton = async () =>{
    addPeriod(loggedPeriods);
  };
  const userData = () =>{
    const startDate = Moment(date[0].startDate).format()
    const endDate = Moment(date[0].endDate).format()

    let period = [{
      startDate: startDate,
      endDate: endDate
    }]
    if (period[0].startDate !== period[0].endDate){
      if(loggedPeriods.length === 0){
        setLoggedPeriods(period)
      }else{
        let newLogged = [...loggedPeriods, ...period]
        setLoggedPeriods(newLogged)
      }
    }
  }
  const removeNewPeriod = (key) =>{
    const periodUpdate = [...loggedPeriods]
    periodUpdate.splice(key, 1)
    setLoggedPeriods(periodUpdate)
  }
    // const setDates = (dates) =>{
    //   dispatch(
    //     setPeriod({
    //       previousPeriod: dates
    //     })
    //   );
    // }
    useEffect(()=>{
      userData(date)
    },[date]);
    console.log(loggedPeriods)

  const content =
    <div className='page-wrapper'>
      <Nav />
      <section className='info content'>
        <div className='logging-period'>
          <h1>Do you have any more period(s) to log?</h1>
          <span className='message'>{periodMessage}</span>
          <DateRange
              editableDateInputs={true}
              showMonthAndYearPickers={false}
              fixedHeight = {true}
              onChange={item => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
            />
         <div className='period-add'>
          <h2>Periods to add:</h2>
          {loggedPeriods.length ?(
            <>
            <ol>
            {loggedPeriods.map((dates, key)=>(
              <li key={key}>
                {`${Moment(dates.startDate).format('MMMM Do')} - ${Moment(dates.endDate).format('MMMM Do')}`}&nbsp;<button onClick={()=>removeNewPeriod(key)} className='btn-period-list'>&#120684;</button>
              </li>
            ))}
          </ol>
          <button className='button' onClick={addPeriodButton}>Add</button>
          </>
          ):(
            <span>None</span>
          )}
         </div> 
        </div>
        <div className='remove-period'>
          <h2>Or would you like to remove some?</h2>
          <span className='message'>{message}</span>
          <fieldset>
            <label htmlFor = 'periods'>Select a period to remove:</label>
            <select name='periods' className='periods' onChange={optionChange}>
              <option disabled selected>Select a date</option>
              {userInfo.map((period, key) => <option value={key} key={key}>{`${Moment(period.startDate).format('MMMM Do YYYY')} - ${Moment(period.endDate).format('MMMM Do YYYY')}`}</option>
              )}
            </select>
          </fieldset>
          <button className='button' onClick={removePeriodButton}>Remove</button>
        </div>
      </section>
      <Footer />
    </div>

  return content;
}

export default PeriodInfo
