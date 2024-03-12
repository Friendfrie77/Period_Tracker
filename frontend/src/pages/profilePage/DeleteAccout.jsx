import React from 'react'
import {Form} from 'react-final-form';
import UserLogin from "../../components/userLoginField/UserLogin";
import useProfile from '../../hooks/useProfile';
const DeleteAccout = (props) => {
  const {userRole, deleteAccount, message} = useProfile();
  console.log(message)
  const deleteAccountCall = (values) =>{
    deleteAccount(values)
  }
  return (
    <div className='warning-box'>
        <h1>Please enter your email adress to delete your account.</h1>
        <p>This will delete any data associated with the account and cannont be reversed.</p>
        <Form
          onSubmit={deleteAccountCall}
          validate = {values =>{
            const error ={};
            if (!values.email && userRole !=='Guest'){
              error.email = 'Required'
            }
            return error
          }}
          render = {({handleSubmit, vaild}) =>(
            <form onSubmit={handleSubmit}>
              <span className={`${message.type === 'error' ? 'warning' : 'success'}`}>{message.msg}</span>
              <UserLogin
                fieldName = 'email'
                type = 'email'
                spanHtmlFor = 'email'
                span = {userRole === "Guest" ? 'Account Id will be auto filled' : 'Email'}
                isDisabled = {userRole === 'Guest'}
              />
              <button className='button' type='submit' disabled={!vaild && userRole !== 'Guest'}>Delete</button>
            </form>
          )}
         />
        <button className='text-button' onClick={props.openDeleteBox}>Cancel</button>
  </div>
  )
}

export default DeleteAccout
