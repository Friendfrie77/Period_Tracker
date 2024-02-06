import {Form, Field} from 'react-final-form';
import {useState} from 'react';
import Spinner from '../../components/Spinner';
import {AiOutlineClose} from 'react-icons/ai'
import useLogin from '../../hooks/useLogin';
function Login(props){
    const {login, isLoading, loginError} = useLogin()
    const [errormsg, setError] = useState(null)
    const onSubmit = (values) => {
        login(values.email, values.password)
    }
    const content = isLoading ? <Spinner /> : (
        <section className='login-wrapper'>
            <AiOutlineClose onClick={props.onShow} className='exit-button' />
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
                        <h1>Sign In</h1>
                        <span className='message warning'>{loginError}</span>
                        <Field name='email'>
                            {({input, meta})=> (
                            <div className='email-input'>
                                <input {...input} type='email' required />
                                <label htmlFor='email' className='login-lable'>
                                    <span className='login-span'>Email<small>*</small></span>
                                </label>
                                {meta.error && meta.touched && setError('Invaild email')}
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
                                    {meta.error && meta.touched && setError('Required')}
                                </div>
                            )}
                        </Field>
                        {/* <div className='remember-me'>
                            <input type='checkbox' id='remember' name='chkbox'></input>
                            <label htmlFor='chkbox'>Remember Me</label>
                        </div> */}
                        <button type='submit' disabled={submitting}>Login</button>
                    </form>
                )}
            />
        </section>
    )
    return content
};

export default Login