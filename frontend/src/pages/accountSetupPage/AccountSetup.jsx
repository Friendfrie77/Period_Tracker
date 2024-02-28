import {useEffect, useState} from 'react';
import { DateRange } from 'react-date-range';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setPeriod} from '../../state';
import { useSelector } from "react-redux";
import Spinner from '../../components/Spinner';
import useAccountSetup from '../../hooks/useAccountSetup';
import usePeriodInfo from '../../hooks/usePeriodInfo';
import UserLogin from '../../components/userLoginField/UserLogin';
import {Form} from 'react-final-form';


const AccountSetup = () => {
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.token));
  const {sendAccountInfo, sendDemoInfo, isLoading} = useAccountSetup();
  const {updateUserDates, loggedPeriods} = usePeriodInfo();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const accountInfoButton = () =>{
    sendAccountInfo(loggedPeriods)
  }
  const demoAccountButton = (val) => {
    sendDemoInfo(val,loggedPeriods)
  }
  const setDates = (dates) =>{
    dispatch(
      setPeriod({
        previousPeriod: dates
      })
    );
  }
  useEffect(()=>{
    updateUserDates(date);
  },[date]);
  const setup = isLoading ? <Spinner /> : (
        <section className='setup-wrapper'>
          {isAuth ? (
            <>
              <h1>When was your last few periods?</h1>
              <p>Just select them below, and once your done hit next. Please try to make them as close as you can.</p>
              <DateRange
                editableDateInputs={true}
                showMonthAndYearPickers={false}
                fixedHeight = {true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
              />
              <button type='submit' className='nextButton' onClick={accountInfoButton}>Next</button>
            </>
          ):(
            <>
              <h1>Welcome to the demo!</h1>
              <p>You can select dates if you would like, but it is not required, all we need is something to call you by.</p>
              <DateRange
                editableDateInputs={true}
                showMonthAndYearPickers={false}
                fixedHeight = {true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
              />
              <Form
                onSubmit={demoAccountButton}
                validate = {values =>{
                  const errors = {};
                  if(!values.name){
                    errors.name = 'Required'
                  }
                  return errors
                }}
                render = {({handleSubmit, form, submitting, pristine, values, valid, touched
                }) =>(
                  <form className='flex-center demo-form' onSubmit={handleSubmit}>
                    <UserLogin
                      fieldName= 'name'
                      type = 'text'
                      spanHtmlFor = 'name'
                      span='Name' 
                    />
                    <button className='button' type='submit' disabled={!valid}>Submit</button>
                  </form>
                )}
              />
            </>
          )}
        </section>
  )
  return setup
}

export default AccountSetup
