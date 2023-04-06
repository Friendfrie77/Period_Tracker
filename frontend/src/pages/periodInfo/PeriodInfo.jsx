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
  const userInfo = useSelector((state) => state.previousPeriod)
  const [removeDate, setRemove] = useState()
  const [message, setMessage] = useState()
  const [periodMessage, setPMessage] = useState()
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const optionChange = (event) =>{
    setRemove(event.target.value)
  }

  const removePeriod = async () =>{
    if (!removeDate){
      setMessage('Please select a date')
    }else{
      const res =  await axios.post(`${process.env.REACT_APP_APIURL}/user/removePeriod`,{
        email, removeDate},{
          headers: {'Authorization': `Bearer ${token}`},
        })
        if (res.status === 201){
          dispatch(
            setPeriod({
              previousPeriod: res.data.previousPeriod
            })
          )
          setMessage(res.data.message)
        }
      }
    }
    const userData = (date) =>{
      if (date[0].endDate){
        const start = date[0].startDate.getDate()
        const end = date[0].endDate.getDate()
        if (start != end){
          const startDate = Moment(date[0].startDate).format()
          const endDate = Moment(date[0].endDate).format()
          if (userInfo.length != 0){
            const dates = userInfo.map(function(element){return element;})
            let period = {
              startDate: startDate,
              endDate: endDate,
              count: userInfo.length,
            }
            dates.push(period)
            setDates(dates)
          }else{
            let period = {
              startDate: startDate,
              endDate: endDate,
              count: 0,
            }
            let dates = [period]
            setDates(dates)
          }
        }
      }
    }
    const setDates = (dates) =>{
      dispatch(
        setPeriod({
          previousPeriod: dates
        })
      );
    }
    const addPeriod = async () =>{
      const sendDates = await axios.post(`${process.env.REACT_APP_APIURL}/user/newuser`,{
        email, userInfo},{
          headers: {'Authorization': `Bearer ${token}`},
        }
      )
      const res = await sendDates
      setPMessage(`${res.data.message}!`)
    };
    
    useEffect(()=>{
      userData(date)
    },[date]);
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
              // scroll = {{enabled: true}}
            />
          <button className='button' onClick={addPeriod}>Add</button>
        </div>
        <div className='remove-period'>
          <span className='message'>{message}</span>
          <h2>Or would you like to remove some?</h2>
          <fieldset>
            <label htmlFor = 'periods'>Select a period to remove:</label>
            <select name='periods' className='periods' onChange={optionChange}>
              <option disabled selected>Select a date</option>
              {userInfo.map((date, key) => <option value={key} key={date + key}>{`${Moment(date.startDate).format('MMMM Do YYYY')} - ${Moment(date.endDate).format('MMMM Do YYYY')}`}</option>
              )}
            </select>
          </fieldset>
          <button className='button' onClick={removePeriod}>Remove</button>
        </div>
      </section>
      <Footer />
    </div>

  return content;
}

export default PeriodInfo
