import {useEffect, useState} from 'react';
import { DateRange } from 'react-date-range';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Moment from 'moment';
import {setPeriod} from '../../state';
import { useSelector } from "react-redux";
import axios from 'axios';
import Spinner from '../../components/Spinner';


const AccountSetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.token));
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [isLoading, setLoading] = useState(false)
  const userInfo = useSelector((state) => state.previousPeriod);
  const email = useSelector((state) => state.email)
  const token = useSelector((state) => state.token)
  console.log(isAuth)
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
  const username = 'test';
  useEffect(()=>{
    userData(date)
  },[date]);
  const accountInfo = async () =>{
    setLoading(true)
    try{
      const dates = await axios.post(`${process.env.REACT_APP_APIURL}/user/newuser`,{
          email,
          userInfo
          },{
            headers: {'Authorization': `Bearer ${token}`},
          }
          );
          if (dates){
            navigate('/Home')
          }
    }catch(err){
      console.log(err)
    }
  }
  const demoAccount = async () =>{
    setLoading(true)
    const test = await axios.post(`${process.env.REACT_APP_APIURL}/demo`,{
      username
    })
  }
  const setup = isLoading ? <Spinner /> : (
        <section className='setup-wrapper'>
          {isAuth ? (
            null
          ):( 
            <span>Please enter in a name</span>
          )}
          <h1>When was your last few periods?</h1>
          <p>Just select them below, and once your done hit next. Please try to make them as close as you can.</p>
          <DateRange
            editableDateInputs={true}
            showMonthAndYearPickers={false}
            fixedHeight = {true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            // scroll = {{enabled: true}}
          />
          {isAuth ? (
            <button type='submit' className='nextButton' onClick={accountInfo}>Next</button>
          ):(
            <button type='submit' className='nextButton' onClick={demoAccount}>Next</button>
          )}
        </section>
  )
  return setup
}

export default AccountSetup
