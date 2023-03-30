import React from 'react'

const DeleteAccout = (props) => {
  return (
    <div className='warning-box'>
        <h1>Please enter your email adress to delete your account.</h1>
        <form onSubmit={props.deleteAccount} className='delete-account'>
        <div className='email-input'>
            <input type='email' value={props.deletedEmail} onChange={props.emailChange}></input>
            <label htmlFor='email' className='login-lable'>
            <span className='login-span'>Email</span>
            </label>
        </div>
        <button className='button' type='submit'>Delete</button>
        <button className='button' onClick={props.openDeleteBox}>Cancel</button>
        </form>
  </div>
  )
}

export default DeleteAccout
