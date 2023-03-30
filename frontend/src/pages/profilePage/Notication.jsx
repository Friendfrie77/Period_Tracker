import {useState} from 'react';
import { useSelector } from "react-redux";
import { Axios } from 'axios';
function Notication(props) {
    const notification = useSelector((state) => state.notification);
    const email = useSelector((state) => state.email);
    const token = useSelector((state) => state.token);
    const [phoneNumber, setPhoneNumber] = useState('')
    
    const numberChange = (number) =>{
        setPhoneNumber(number.target.value)
    }
    const submit = async () =>{

    }
  return (
    <div className='warning-box'>
        {notification &&
            <div className='notification'>
                <h1>Would you like to stop notifications?</h1>
                <div className='button-container'> 
                    <button className='button'>Yes</button>
                    <button className='button' onClick={props.close}>No</button>
                </div>
            </div>

        }
        {!notification &&
            <div className='notification'>
                <h1>Would you like to receive text notification</h1>
                <div className='button-container'>
                    <form>
                        <div className='toggle-on'>
                            <input typeof='tel' id='tel-number' onChange={numberChange} required></input>
                            <label htmlFor='tel-number' className='login-lable'>
                                <span className='login-span'>(xxx)-xxx-xxxx</span>
                            </label>
                        </div>
                        <button className='button'>Submit</button>
                    </form>
                    <button className='text-button' onClick={props.close}>Go Back</button>
                </div>
            </div>
        }
    </div>
  )
}

export default Notication
