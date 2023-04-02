import React from 'react'

function ChangePassword(props) {
  return (
    <div className='warning-box'>
      <h1>Would you like to change your password?</h1>
      <form className='password-change' onSubmit={props.changePassword}>
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
        <button className='button' type='submit'>Submit</button> 
      </form>
      <button className='text-button' onClick = {props.close}>Go back</button>
    </div>
  )
}

export default ChangePassword
