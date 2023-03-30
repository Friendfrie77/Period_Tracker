import React from 'react'

function ChangePassword(props) {
  return (
    <form className='password-change warning-box' onSubmit={props.changePassword}>
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
                  <button type='submit'>Submit</button>
                </form>
  )
}

export default ChangePassword
