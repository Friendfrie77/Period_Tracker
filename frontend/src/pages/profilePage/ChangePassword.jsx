import {passwordRegex} from '../../utils/password-regex'
import {Form} from 'react-final-form';
import useProfile from '../../hooks/useProfile';
import UserLogin from "../../components/userLoginField/UserLogin";

function ChangePassword(props) {
  const {changePassword, message} = useProfile();
  const passwordChange = async (values) =>{
    changePassword(values)
  }
  const content = (
    <div className='warning-box'>
      <h1>Would you like to change your password?</h1>
      <Form
        onSubmit={passwordChange}
        validate={values =>{
          const errors = {}
          if(!values.oldPassword){
            errors.oldPassword = 'Required'
          }
          if(!values.newPassword){
            errors.newPassword = 'Required'
          }
          if(!values.confirmNewPassword){
            errors.confirmNewPassword = 'Required'
          }else{
            const regex = passwordRegex(values.newPassword, values.confirmNewPassword)
            if(!regex.isVaild){
              errors.newPassword = regex.msg
            }
          }
          return errors
        }}
        render = {({handleSubmit, valid, touched,pristine}) =>(
          <form className='password-change' onSubmit = {handleSubmit}>
            <span className={`${message.type === 'error' ? 'warning' : 'success'}`}>{message.msg}</span>
            <UserLogin
              fieldName = 'oldPassword'
              type ='password'
              spanHtmlFor = 'oldPassword'
              span ='Curent Password'
            />
            <UserLogin
              fieldName = 'newPassword'
              type = 'password'
              spanHtmlFor = 'newPassword'
              span = 'New Password'
            />
            <UserLogin
              fieldName = 'confirmNewPassword'
              type = 'password'
              spanHtmlFor = 'confirmNewPassword'
              span = 'Confirm New Password'
            />
          <button type ="submit" className='button' disabled={!valid}>Submit</button>
          </form>
        )}
      />
      <button className='text-button' onClick = {props.close}>Go back</button>
    </div>
  )
  return content;
}

export default ChangePassword
