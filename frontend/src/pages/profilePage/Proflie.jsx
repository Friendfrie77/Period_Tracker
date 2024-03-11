import {useState} from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import Nav from '../navbar/Nav'
import Footer from '../footer/Footer';
import ProfileCal from '../../components/ProfileCal';
import {Events } from '../../classes/events';
import PeriodStats from '../../components/PeriodStats';
import PageFade from '../../components/PageFade'
import DeleteAccout from './DeleteAccout';
import ChangePassword from './ChangePassword';
import Notication from './Notication';
import Settings from './Settings';
import useProfile from '../../hooks/useProfile';
import useUserInfo from '../../hooks/useUserInfo';
const Proflie = () => {
  const [open, setOpen] = useState(false);
  const [deleteBox, setDelete] = useState(false);
  const [showPasswordChange, setPasswordChange] = useState(false);
  const [openNoticationBox, setNotication] = useState(false);
  const [deletedEmail, setDeletedEmail] = useState('');
  const [erroMsg, setErrorMsg] = useState('');
  const notification = useSelector((state) => state.notification);
  //hooks
  const {deleteAccount, setOldPassword, setNewPassword, setConfirmPassword, oldPassword, newPassword, confirmNewPassword} = useProfile();
  const {periodStartDate, periodEndDate, previousPeriod, userName, email, role} = useUserInfo();

  const checkUserInfo = () => {
    const events = new Events();
    events.checkForEvents(previousPeriod, periodStartDate, periodEndDate, email,);
    return events.allEvents
  }
  const emailChange = (email) => {
    setDeletedEmail(email.target.value)
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
  const deleteAccountCall = () =>{
    deleteAccount(deletedEmail)
  }
  const changePassword = async () =>{
      // const passwordChange = await axios.post(`${process.env.REACT_APP_APIURL}/auth/changepassword`,{
      //   email, oldPassword, newPassword
      // },{
      //   headers: {'Authorization': `Bearer ${token}`},
      // })
      // const message = await passwordChange
      // setOldPassword('')
      // setNewPassword('')
      // setConfirmPassword('')
      // return ({isVaild: message.data.isValid, message: message.data.messege})
  }
  console.log(oldPassword)
  const content = (
    <div className='page-wrapper'>
      <Nav />
      <section className='profile content'>
        <h1 className='welcome-text'>Hello {userName},</h1>
        <div className='calander'>
          <h2>Here is how you month looks</h2>
          <ProfileCal
            event= {checkUserInfo()}
          />
        </div>
        <PeriodStats />
        <div className='account-settings'>
          <button onClick={settingToggle}>Settings</button>
          {open &&
            <PageFade content = {<Settings openPassword = {openPasswordChange} openNotication = {noticationBox} openDeleteBox= {openDeleteBox} close={settingToggle} erroMsg= {erroMsg} />} />
          }
        </div>
        {deleteBox &&
        <PageFade content = {<DeleteAccout deleteAccount ={deleteAccountCall} deletedEmail={deletedEmail} emailChange={emailChange} openDeleteBox={openDeleteBox} role = {role} />} />
        }
        {openNoticationBox &&
         <PageFade content= {<Notication close ={noticationBox} />} />
        }
        {showPasswordChange &&
          <PageFade content= {<ChangePassword close={openPasswordChange} /> } />
        }
      </section>
      <Footer />
    </div>
  )
  return content
}

export default Proflie


