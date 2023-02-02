import {Form, Field} from 'react-final-form';
import {Link} from 'react-router-dom';
import { setCredentials } from '../../../utils/authApiSlice';
import { useLoginMutation } from '../../../utils/authApiSlice';


function Login(){
    async function onSubmit(values){
    }
    return(
        <section className='login-wrapper'>
            <h1>Sign In</h1>
            <Form
                onSubmit={onSubmit}
                validate = {values => {
                    const errors= {}
                    if (!values.email){
                        errors.email = 'Required'
                    }
                    if (!values.password){
                        errors.password = 'Required'
                    }
                    return errors
                }}
                render = {({handleSubmit, form, submitting, pristine, values}) =>(
                    <form onSubmit={handleSubmit}>
                        <Field name='email'>
                            {({input, meta})=> (
                            <div className='email-input'>
                                <input {...input} type='email' required />
                                <label htmlFor='email' className='login-lable'>
                                    <span className='login-span'>Email<small>*</small></span>
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
            {/* <Link className='recover'>Forgot your username or password?</Link> */}
            <hr></hr>
            <div className='sign-up'>
                <span>New?</span>
                <Link to='/signup'>Create an account here</Link>
            </div>
        </section>
    )
};

export default Login