import {useEffect, useState} from 'react';
import { DateRange } from 'react-date-range';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Moment from 'moment';
import {setPeriod} from '../../state';
import { useSelector } from "react-redux";
import axios from 'axios';
import Spinner from '../../components/Spinner';
import useAccountSetup from '../../hooks/useAccountSetup';
import usePeriodInfo from '../../hooks/usePeriodInfo';


const AccountSetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.token));
  const {sendAccountInfo, updateUserData, isLoading} = useAccountSetup();
  const {updateUserDates, loggedPeriods} = usePeriodInfo();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  // const [isLoading, setLoading] = useState(false)
  // const userInfo = useSelector((state) => state.previousPeriod);
  const email = useSelector((state) => state.email)
  const token = useSelector((state) => state.token)

  const userDates = (date) =>{
    updateUserDates(date);
  }
  const accountInfoButton = (loggedPeriods) =>{
    sendAccountInfo(loggedPeriods)
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
    updateUserDates(date);
  },[date]);
  console.log(date)
  console.log(loggedPeriods)
  // const accountInfo = async () =>{
  //   // setLoading(true)
  //   try{
  //     const dates = await axios.post(`${process.env.REACT_APP_APIURL}/user/newuser`,{
  //         email,
  //         userInfo
  //         },{
  //           headers: {'Authorization': `Bearer ${token}`},
  //         }
  //         );
  //         if (dates){
  //           navigate('/Home')
  //         }
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  const demoAccount = async () =>{
    // setLoading(true)
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
            <button type='submit' className='nextButton' onClick={accountInfoButton}>Next</button>
          ):(
            <button type='submit' className='nextButton' onClick={demoAccount}>Next</button>
          )}
        </section>
  )
  return setup
}

export default AccountSetup
