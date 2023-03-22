import {useState, useEffect} from 'react';
import Moment from 'moment';
import { DateRange } from 'react-date-range';
import { useSelector } from "react-redux";
import axios from 'axios';
import Nav from '../navbar/Nav'
import {useNavigate} from 'react-router-dom';
import { setLogout } from '../../state';
import { useDispatch } from 'react-redux';
import { useFetchUserInfo } from '../../hooks/fetchUserInfo';
import Footer from '../footer/Footer';
const Proflie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user)
  const periodEndDate = useSelector((state) => state.periodEndDate)
  const periodStartDate = useSelector((state) => state.periodStartDate)
  const token = useSelector((state) => state.token)
  const email = useSelector((state) => state.email)
  // const user = useFetchUserInfo(email, token)
  const [open, setOpen] = useState(false);
  const [deleteBox, setDelete] = useState(false);
  const [showPasswordChange, setPasswordChange] = useState(false)
  const [deletedEmail, setDeletedEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmPassword] = useState('');
  const [erroMsg, setErrorMsg] = useState('');

  const checkUserInfo = async (user) => {
    if (!periodStartDate && !periodEndDate){
      const userInfo = await(user)
      console.log('test')
    }
  }
  const [date, setDate] = useState([
    {
      startDate: new Date(Moment(periodStartDate).format('MM-DD-YYYY')),
      endDate: new Date(Moment(periodEndDate).format('MM-DD-YYYY')),
    }
  ])
  const emailChange = (email) => {
    setDeletedEmail(email.target.value)
  }
  const oldPasswordChange = (password) =>{
    setOldPassword(password.target.value)
  }
  const newPasswordChange = (password) =>{
    setNewPassword(password.target.value)
  }
  const confirmPassword = (password) =>{
    setConfirmPassword(password.target.value)
  }
  const settingToggle = () =>{
    setOpen(!open)
  }
  const openDeleteBox = () =>{
    setDelete(!deleteBox)
  }
  const openPasswordChange = () =>{
    setPasswordChange(!showPasswordChange)
  }
  const deleteAccount = () =>{
    if (deletedEmail === email){
      axios.post(`${process.env.REACT_APP_APIURL}/auth/deleteuser`, {
        email
      },{
        headers: {'Authorization': `Bearer ${token}`},
      })
      dispatch(
        setLogout()
      )
      navigate('/')
    }
  }
  const changePassword = () =>{
    if (newPassword == confirmNewPassword){
      axios.post(`${process.env.REACT_APP_APIURL}/auth/changepassword`,{
        email, oldPassword, newPassword
      },{
        headers: {'Authorization': `Bearer ${token}`},
      })
    }else(
      setErrorMsg('New passwords do not match')
    )
  }
  // useEffect(() =>{
  //   checkUserInfo(user)
  // }, [])

  const content = (
    <div>
      <Nav />
      <section className='page-wrapper'>
        <h1 className='welcome-text'>Hello {userName},</h1>
        <h2>here is how you month looks</h2>
        <DateRange
          editableDateInputs = {false}
          showMonthAndYearPickers = {false}
          ranges = {date}
        />
        <div className='account-settings'>
          <button onClick={settingToggle}>Settings</button>
          {open && 
          <div className='inner-account-settings'>
            <div className='setting-option'>
              <button>Email Notifications</button>
            </div>
            <div className='setting-option'>
              <button onClick={openPasswordChange}>Password Change</button>
              {showPasswordChange &&
                <form className='password-change' onSubmit={changePassword}>
                  <div className='password-input'>
                    <input type = 'password' value={oldPassword} onChange={oldPasswordChange}></input>
                    <label htmlFor='password' className='login-lable'>
                        <span className='login-span'>Old Password<small>*</small></span>
                    </label>
                  </div>
                  <div className='password-input'>
                    <input type = 'password' value={newPassword} onChange={newPasswordChange}></input>
                    <label htmlFor='password' className='login-lable'>
                        <span className='login-span'>New Password<small>*</small></span>
                    </label>
                  </div>
                  <div className='password-input'>
                    <input type = 'password' value={confirmNewPassword} onChange={confirmPassword}></input>
                    <label htmlFor='password' className='login-lable'>
                        <span className='login-span'>Confirm Password<small>*</small></span>
                    </label>
                  </div>
                  <button type='submit'>Submit</button>
                </form>
              }
            </div>
            <div className='setting-option'>
              <button onClick={openDeleteBox}>Delete Account</button>
            </div>
          </div>
          }
        </div>
        {deleteBox &&
        <div className='page-fade'>
          <div className='warning-box'>
            <h1>Please enter your email adress to delete your account.</h1>
            <form onSubmit={deleteAccount} className='delete-account'>
              <div className='email-input'>
                <input type='email' value={deletedEmail} onChange={emailChange}></input>
                <label htmlFor='email' className='login-lable'>
                  <span className='login-span'>Email</span>
                </label>
              </div>
              <button type='submit'>Delete</button>
              <button onClick={openDeleteBox}>Cancel</button>
            </form>
          </div>
        </div>
        }
        <Footer />
      </section>
    </div>
  )
  return content
}

export default Proflie


