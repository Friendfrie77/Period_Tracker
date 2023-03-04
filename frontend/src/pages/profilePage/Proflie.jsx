import {useState, useEffect} from 'react'
import Moment from 'moment'
import { DateRange } from 'react-date-range'
import { useSelector } from "react-redux";
import Nav from '../navbar/Nav'
import { useFetchUserInfo } from '../../hooks/fetchUserInfo';

const Proflie = () => {
  const userName = useSelector((state) => state.user)
  const periodEndDate = useSelector((state) => state.periodEndDate)
  const periodStartDate = useSelector((state) => state.periodStartDate)
  const token = useSelector((state) => state.token)
  const email = useSelector((state) => state.email)
  const user = useFetchUserInfo(email, token)
  const checkUserInfo = async (user) => {
    if (!periodStartDate && !periodEndDate){
      const userInfo = await(user)
      console.log('test')
    }
  }
  const [date, setDate] = useState([
    {
      startDate: new Date(Moment(periodStartDate).format('YYYY-MM-DD')),
      endDate: new Date(Moment(periodEndDate).format('YYYY-MM-DD')),
    }
  ])
  useEffect(() =>{
    checkUserInfo(user)
  }, [])

  const content = (
    <div>
      <Nav />
      <section className='profile'>
        <h1 className='welcome-text'>Hello {userName},</h1>
        <h2></h2>
        <DateRange
          editableDateInputs = {false}
          showMonthAndYearPickers = {false}
          ranges = {date}
        />
        <div className='account-settings'>
          <span>Settings</span>
          <ul>
            <li>Email Notifications</li>
            <li>Password Change</li>
            <li>Delete Account</li>
          </ul>
        </div>
      </section>
    </div>
  )
  return content
}

export default Proflie


