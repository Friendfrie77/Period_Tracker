import {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AccountSetup = () => {
    const {date, onChange} = useState(new Date());
    console.log(date)
  return (
    <div>
        <Calendar onChange={onChange} value={date}></Calendar>
    </div>
  )
}

export default AccountSetup
