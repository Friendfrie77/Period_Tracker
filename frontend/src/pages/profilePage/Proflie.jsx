import {useState, useEffect} from 'react';
import Moment from 'moment';
import { useSelector } from "react-redux";

import axios from 'axios';
import Nav from '../navbar/Nav'
import {useNavigate} from 'react-router-dom';
import { setLogout } from '../../state';
import { useDispatch } from 'react-redux';
import {fetchUserInfo} from '../../utils/fetchUserInfo'
import Footer from '../footer/Footer';
import ProfileCal from '../../components/ProfileCal';
import {Events } from '../../classes/events';
import PageFade from '../../components/PageFade'
import DeleteAccout from './DeleteAccout';
import ChangePassword from './ChangePassword';
import Notication from './Notication';
const Proflie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user)
  const periodEndDate = useSelector((state) => state.periodEndDate)
  const periodStartDate = useSelector((state) => state.periodStartDate)
  const token = useSelector((state) => state.token)
  const email = useSelector((state) => state.email)
  const previousPeriod = useSelector((state) => state.previousPeriod)
  // const user = fetchUserInfo(email, token)
  const [open, setOpen] = useState(false);
  const [deleteBox, setDelete] = useState(false);
  const [showPasswordChange, setPasswordChange] = useState(false);
  const [openNoticationBox, setNotication] = useState(false);
  const [deletedEmail, setDeletedEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmPassword] = useState('');
  const [erroMsg, setErrorMsg] = useState('');
  const notification = useSelector((state) => state.notification);
  console.log(notification)
  let periodEvent = new Events()
  const [pEvents, setEvents] = useState(periodEvent.allEvents)
  const checkUserInfo = async () => {
    if (pEvents.length == 0){
      for(const periods in previousPeriod){
        let start = Moment(previousPeriod[periods].startDate)
        let end = Moment(previousPeriod[periods].endDate)
        periodEvent.newEvent('Period Active', start, end, true)
      }
      if (periodStartDate && periodEndDate){
        let start = Moment(periodStartDate)
        let end = Moment(periodEndDate)
        periodEvent.newEvent('Period Active', start, end, true)
      }
    }
  }
  const emailChange = (email) => {
    setDeletedEmail(email.target.value)
    console.log(email.target.value)
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
  const noticationBox = () => {
    setNotication(!openNoticationBox)
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
  useEffect(() =>{
    checkUserInfo()
  },[])

  const content = (
    <div className='page-wrapper'>
      <Nav />
      <section className='profile content'>
        <h1 className='welcome-text'>Hello {userName},</h1>
        <div className='calander'>
          <h2>Here is how you month looks</h2>
          <ProfileCal
            event= {pEvents}
          />
        </div>
        <div className='account-settings'>
          <button onClick={settingToggle}>Settings</button>
          {open && 
            <div className='inner-account-settings'>
              <div className='setting-option'>
                <button onClick={openPasswordChange}>Password Change</button>
              </div>
              <div className='setting-option'>
                <button onClick ={noticationBox}>Toggle Notication</button>
              </div>
              <div className='setting-option'>
                <button onClick={openDeleteBox}>Delete Account</button>
              </div>
            </div>
          }
        </div>
        {deleteBox &&
        <PageFade content = {<DeleteAccout deleteAccount ={deleteAccount} deletedEmail={deletedEmail} emailChange={emailChange} openDeleteBox={openDeleteBox}/>} />
        }
        {openNoticationBox &&
         <PageFade content= {<Notication close ={noticationBox} />} />
        }
        {showPasswordChange &&
          <PageFade content= {<ChangePassword changePassword = {changePassword} oldPassword = {oldPassword} oldPasswordChange= {oldPasswordChange} newPassword = {newPassword} newPasswordChange = {newPasswordChange} confirmNewPassword = {confirmNewPassword} confirmPassword = {confirmPassword}/>} />
        }
      </section>
      <Footer />
    </div>
  )
  return content
}

export default Proflie


