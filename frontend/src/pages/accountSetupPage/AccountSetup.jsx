import {useEffect, useState} from 'react';
import { DateRange } from 'react-date-range';
import { useDispatch } from 'react-redux';
import Moment from 'moment';
import { setLogin } from '../../state';
import { useSelector } from "react-redux";
import axios from 'axios';


const AccountSetup = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);
  const userInfo = useSelector((state) => state.previousPeriod);
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
          setPeriod(dates)
        }else{
          let period = {
            startDate: startDate,
            endDate: endDate,
            count: 0,
          }
          let dates = [period]
          setPeriod(dates)
        }
      }
    }
  }
  const setPeriod = () =>{
    dispatch(
      setLogin({
        previousPeriod: [],
      })
    );
  }

  useEffect(()=>{
    userData(date)
  },[date]);

  // const accountInfo = async () =>{
  //   userInfo = useSelector((state) => state.previousPeriod);
  //   try{
  //     const result = await axios.post(,{
  //       userInfo
  //     }
  //   }
  // }
  const Setup = (
      <section className='setup-wrapper'>
        <h1>When was your last few periods?</h1>
        <p>Just select them below, and once your done hit next.</p>
        <DateRange
          editableDateInputs={true}
          onChange={item => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
        />
        <button type='submit' className='nextButton'>Next</button>
      </section>
  )
  return Setup
}

export default AccountSetup
