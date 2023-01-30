import {Form, Field} from 'react-final-form';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
function Login(){
    const navigate = useNavigate();
    const [regError, setRegError] = useState("");
    let success = true;
    async function onSubmit(values){
        let userInfo = {userName: values.username, password: values.password}
        try{
            const results = await axios.post ('http://localhost:8080/login', {
                userInfo
            })
        }catch(error){
            success = false;
            setRegError(error.response.data.error)
        }
        if (success === true){
            // const test = axios.response.headers
            // console.log(test)
        }
    }
    return(
        <section className='login-wrapper'>
            <h1>Sign In</h1>
            <Form
                onSubmit={onSubmit}
                validate = {values => {
                    const errors= {}
                    if (!values.username){
                        errors.username = 'Required'
                    }
                    if (!values.password){
                        errors.password = 'Required'
                    }
                    return errors
                }}
                render = {({handleSubmit, form, submitting, pristine, values}) =>(
                    <form onSubmit={handleSubmit}>
                        <Field name='username'>
                            {({input, meta})=> (
                            <div className='username-input'>
                                <input {...input} type='text' required />
                                <label htmlFor='username' className='login-lable'>
                                    <span className='login-span'>Username<small>*</small></span>
                                </label>
                                {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                            </div>
                            )}
                        </Field>
                        <Field name='password'>
                            {({input, meta}) => (
                                <div className='password-input'>
                                    <input {...input} type ='password' required></input>
                                    <label htmlFor='password' className='login-lable'>
                                        <span className='login-span'>Password<small>*</small></span>
                                    </label>
                                    {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                        <div className='remember-me'>
                            <input type='checkbox' id='remember' name='chkbox'></input>
                            <label htmlFor='chkbox'>Remember Me</label>
                        </div>
                        <button type='submit' disabled={submitting}>Submit</button>
                    </form>
                )}
            />
            <Link className='recover'>Forgot your username or password?</Link>
            <hr></hr>
            <div className='sign-up'>
                <span>New?</span>
                <Link to='/signup'>Create an account here</Link>
            </div>
        </section>
    )
};

export default Login