import { useState } from 'react'
import {passwordRegex} from '../../utils/password-regex'
import {Form} from 'react-final-form';
import useProfile from '../../hooks/useProfile';
import UserLogin from "../../components/userLoginField/UserLogin";

function ChangePassword(props) {
  const {changePassword, oldPassword, newPassword, confirmNewPassword, oldPasswordChange, newPasswordChange, confirmPassword} = useProfile();
  const [vaildPassword, setVaildPassword] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const [message, setmessage] = useState()

  const passwordChange = async () =>{
    changePassword(oldPassword, newPassword)
  }
  const content = (
    <div className='warning-box'>
      <Form
        onSubmit={passwordChange}
        validate={values =>{
          const errors = {}
          if(!values.oldPassword){
            errors.oldPassword = 'Required'
          }
          if(!values.newPassword){
            errors.oldPassword = 'Required'
          }
          if(!values.confirmNewPassword){
            errors.oldPassword = 'Required'
          }else{
            const regex = passwordRegex(values.newPassword, values.confirmNewPassword)
            if(!regex.isVaild){
              errors.password = regex.msg
            }
          }
          return errors
        }}
        render = {({handleSubmit, valid}) =>(
          <form onSubmit = {handleSubmit}>
            <h1>Would you like to change your password?</h1>
            <UserLogin
              
            />
          </form>
        )}
      />
      <button className='text-button' onClick = {props.close}>Go back</button>
    </div>
  )
  // return (
  //   <div className='warning-box'>
  //     <h1>Would you like to change your password?</h1>
  //     <div className='password-change'>
  //       <span className='warning'>{errorMsg}</span>
  //       <span className='success'>{message}</span>
  //       <div className='password-input'>
  //         <input type = 'password' id = 'oldPassword' value={oldPassword} onChange={oldPasswordChange}></input>
  //         <label htmlFor='password' className='login-lable'>
  //             <span className='login-span'>Old Password<small>*</small></span>
  //         </label>
  //       </div>
  //       <div className='password-input'>
  //         <input type = 'password' value={newPassword} onChange={newPasswordChange}></input>
  //         <label htmlFor='password' className='login-lable'>
  //             <span className='login-span'>New Password<small>*</small></span>
  //         </label>
  //       </div>
  //       <div className='password-input'>
  //         <input type = 'password' value={confirmNewPassword} onChange={confirmPassword}></input>
  //         <label htmlFor='password' className='login-lable'>
  //             <span className='login-span'>Confirm Password<small>*</small></span>
  //         </label>
  //       </div>
  //       <button className='button' type='submit' onClick={passwordChange}>Submit</button> 
  //     </div>
  //     <button className='text-button' onClick = {props.close}>Go back</button>
  //   </div>
  // )
  return content;
}

export default ChangePassword
