import React from 'react'
import Nav from '../navbar/Nav'
import Footer from '../footer/Footer';
import {useEffect, useState} from 'react';
import { DateRange } from 'react-date-range';
import { useSelector, useDispatch } from "react-redux";
import Moment from 'moment';
import axios from 'axios';
import { setPeriod } from '../../state';


function PeriodInfo() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token)
  const email = useSelector((state) => state.email)
  const previousPeriod = useSelector((state) => state.previousPeriod)
  const [removeDate, setRemove] = useState()
  const [message, setMessage] = useState()
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(''),
      key: 'selection'
    }
  ]);

  const optionChange = (event) =>{
    setRemove(event.target.value)
  }
  const removePeriod = async () =>{
    const res =  await axios.post(`${process.env.REACT_APP_APIURL}/user/removePeriod`,{
      email, removeDate},{
        headers: {'Authorization': `Bearer ${token}`},
      })
      if (res.status === 201){
        console.log(res.data)
        dispatch(
          setPeriod({
            previousPeriod: res.data.previousPeriod
          })
        )
        setMessage(res.data.message)
      }
    }
  const content =
    <div className='page-wrapper'>
      <Nav />
      <div className='logging-period'>
        <h1>{message}</h1>
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
        <span className='message'>{message}</span>
        <h2>Or would you like to remove some?</h2>
        <fieldset>
          <label htmlFor = 'periods'>Select a period to remove:</label>
          <select name='periods' className='periods' onChange={optionChange}>
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
