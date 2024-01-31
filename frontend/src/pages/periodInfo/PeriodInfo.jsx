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
  const userInfo =[useSelector((state) => state.previousPeriod)]
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
  const [loggedPeriods, setLoggedPeriods] =useState([])
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
    const removeNewPeriod = (key) =>{
      const periodUpdate = [...loggedPeriods]
      periodUpdate.splice(key, 1)
      setLoggedPeriods(periodUpdate)
    }
    useEffect(()=>{
      userData(date)
    },[date]);
    loggedPeriods.forEach((dates, key)=> {console.log(dates,key)})
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
          <button className='button' onClick={addPeriod}>Add</button>
          </>
          ):(
            <span>None</span>
          )}
         </div> 
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
