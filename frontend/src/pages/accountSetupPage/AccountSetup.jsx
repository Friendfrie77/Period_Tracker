import {useEffect, useState} from 'react';
import { DateRange } from 'react-date-range';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Moment from 'moment';
import { setLogin } from '../../state';
import { useSelector } from "react-redux";
import axios from 'axios';
import Spinner from '../../components/Spinner'
import Waves from '../../components/Waves'


const AccountSetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);
  const [isLoading, setLoading] = useState(false)
  const userInfo = useSelector((state) => state.previousPeriod);
  const email = useSelector((state) => state.email)
  const token = useSelector((state) => state.token)
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
  const setPeriod = (dates) =>{
    dispatch(
      setLogin({
        previousPeriod: dates,
      })
    );
  }

  useEffect(()=>{
    userData(date)
  },[date]);
  const accountInfo = async () =>{
    setLoading(true)
    try{
      await axios.post('http://localhost:8080/user/add',{
          email,
          userInfo
          },{
            headers: {'Authorization': `Bearer ${token}`},
          }
          );
      navigate('/home')
    }catch(err){
      console.log(err)
    }
  }
  const setup = isLoading ? <Spinner /> : (
      <section className='setup-wrapper'>
        <h1>When was your last few periods?</h1>
        <p>Just select them below, and once your done hit next.</p>
        <DateRange
          editableDateInputs={true}
          onChange={item => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
        />
        <button type='submit' className='nextButton' onClick={accountInfo}>Next</button>
        <Waves />
      </section>
  )
  return setup
}

export default AccountSetup
