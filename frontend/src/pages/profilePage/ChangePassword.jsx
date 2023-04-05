import { useState } from 'react'
import { passwordRegex } from '../../utils/password-regex'

function ChangePassword(props) {
  const [vaildPassword, setVaildPassword] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const test = () =>{
    const passVaild = passwordRegex(props.newPassword, props.confirmNewPassword)
    if(!passVaild.isvaild){
      setErrorMsg(passVaild.msg)
    }else{
      setVaildPassword(true)
      props.ChangePassword()
    }
  }
  return (
    <div className='warning-box'>
      <h1>Would you like to change your password?</h1>
      <div className='password-change'>
        <span className='warning'>{errorMsg}</span>
        <div className='password-input'>
          <input type = 'password' value={props.oldPassword} onChange={props.oldPasswordChange}></input>
          <label htmlFor='password' className='login-lable'>
              <span className='login-span'>Old Password<small>*</small></span>
          </label>
        </div>
        <div className='password-input'>
          <input type = 'password' value={props.newPassword} onChange={props.newPasswordChange}></input>
          <label htmlFor='password' className='login-lable'>
              <span className='login-span'>New Password<small>*</small></span>
          </label>
        </div>
        <div className='password-input'>
          <input type = 'password' value={props.confirmNewPassword} onChange={props.confirmPassword}></input>
          <label htmlFor='password' className='login-lable'>
              <span className='login-span'>Confirm Password<small>*</small></span>
          </label>
        </div>
        <button className='button' type='submit' onClick={test}>Submit</button> 
      </div>
      <button className='text-button' onClick = {props.close}>Go back</button>
    </div>
  )
}

export default ChangePassword
