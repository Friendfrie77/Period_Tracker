import {useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios, { Axios } from 'axios';
import { setNotificationStatus } from '../../state';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/high-res.css'
function Notication(props) {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.notification);
    const email = useSelector((state) => state.email);
    const token = useSelector((state) => state.token);
    const [message, setmMessage] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const close = props.close
    const teleElement = useRef()
    useEffect(() =>{
        teleElement.current = phoneNumber
    },[phoneNumber])
    const numberChange = (number) =>{
        setPhoneNumber(number)
        console.log(phoneNumber)
    }
    const submit = async () =>{
        if (notification){
            const status = false
            const number = null
            const res = await axios.post(`${process.env.REACT_APP_APIURL}/user/setnotificationstatus`,{
                email, status, number
            },{
                headers: {'Authorization': `Bearer ${token}`},
            })
            dispatch(
                setNotificationStatus({
                    notification: res.data.notification
                })
            )
            close()
        }else if(!notification){
            const status = true;
            const number = phoneNumber
            const res = await axios.post(`${process.env.REACT_APP_APIURL}/user/setnotificationstatus`,{
                email, status, number
            },{
                headers: {'Authorization': `Bearer ${token}`},
            })
            dispatch(
                setNotificationStatus({
                    notification: res.data.notification
                })
            )
            close()
        }
    }

  return (
    <div className='warning-box'>
        {notification &&
            <div className='notification'>
                <h1>Would you like to stop notifications?</h1>
                <div className='button-container'>
                    <button className='button' onClick={submit}>Yes</button>
                    <button className='button' onClick={props.close}>No</button>
                </div>
            </div>

        }
        {!notification &&
            <div className='notification'>
                <h1>Would you like to receive text notification?</h1>
                <div className='button-container'>
                    <div className='toggle-on'>
                        <PhoneInput
                            onChange={numberChange}
                            country={'us'}
                            value = {phoneNumber}
                        />
                    </div>
                    <button className='button' type='submit' onClick={submit}>Submit</button>
                    <button className='text-button' onClick={props.close}>Go Back</button>
                </div>
            </div>
        }
    </div>
  )
}

export default Notication
