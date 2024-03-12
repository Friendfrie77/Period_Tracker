
import {React} from "react";
import {Form} from 'react-final-form';
import Spinner from '../../components/Spinner';
import {AiOutlineClose} from 'react-icons/ai';
import {passwordRegex} from '../../utils/password-regex';
import useRegSetup from '../../hooks/useRegSetup';
import UserLogin from "../../components/userLoginField/UserLogin";
export default function SignUp(props){
    const {regNewUser ,isLoading} = useRegSetup();
    const onSubmit = async (values) => {
        const res = regNewUser(values);
        if(res){
            console.log(res)
            props.setErr(await res);
        }
    }
    const content = isLoading ? <Spinner /> : (
        <section className='login-wrapper'>
            <AiOutlineClose onClick={props.onShow} className='exit-button' />
            <Form
             onSubmit={onSubmit}
             validate = {values => {
                const errors = {}
                if (!values.email){
                    errors.email = 'Required'
                }
                if (!values.username){
                    errors.username = 'Required'
                }
                if (!values.password){
                    errors.password = 'Required'
                }
                if (!values.passwordconfirm){
                    errors.passwordconfirm = 'Required'
                } else{
                    const regex = passwordRegex(values.password, values.passwordconfirm)
                    if(!regex.isVaild){
                        errors.password = regex.msg
                        // props.setErr(regex.msg)
                    }if(regex.isVaild && props.err){
                        props.setErr(regex.msg)
                    }
                }
                return errors
             }}
             render = {({handleSubmit, form, submitting, pristine, values, valid, touched
             }) =>(
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <UserLogin
                        fieldName = 'email'
                        type = 'email'
                        spanHtmlFor = 'email'
                        span = 'Email'
                    />
                    <UserLogin
                        fieldName = 'username'
                        type = 'text'
                        spanHtmlFor = 'username'
                        span = 'Username'
                    />
                    <UserLogin
                        fieldName = 'password'
                        type = 'password'
                        spanHtmlFor = 'password'
                        span = 'Password'
                    />
                    <UserLogin
                        fieldName = 'passwordconfirm'
                        type = 'password'
                        spanHtmlFor = 'passwordconfirm'
                        span = 'Confirm Password'
                    />
                    <button type="submit" disabled={!valid}>Submit</button>
                </form>
            )}
            />
        </section>
    )
    return content
}
