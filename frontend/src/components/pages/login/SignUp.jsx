import {Form, Field} from 'react-final-form';
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../../utils/authSlice';
import { useRegisterMutation } from '../../../utils/authApiSlice';



export default function SignUp(){
    const userRef = useRef()
    const errRef = useRef()
    const navigate = useNavigate()
    const [register, { isLoading }] = useRegisterMutation()
    const dispatch = useDispatch()
    const [errMsg, setErrMsg] = useState('')
    async function onSubmit(values){
        try{
            const user = (values.Email)
            const userData = await register({Email:values.email, Username:values.username, Password:values.password}).unwrap()
            dispatch(setCredentials({...userData, user }))
            navigate('/accountsetup')
        }catch(err){
            console.log(err.data.error)
            setErrMsg(err.data.error)
        }
    }
    const content = isLoading ? <h1>Loading...</h1> :(
        <section className='login-wrapper'>
            <h1>Sign Up</h1>
            <span className='reg-error'>{errMsg}</span>
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
                    }else if (values.password !== values.passwordconfirm){
                        errors.passwordconfirm = 'Must match'
                    }
                    return errors
                }}
                render = {({handleSubmit, form, submitting, pristine, values}) =>(
                    <form onSubmit={handleSubmit}>
                        <Field name='email' >
                            {({input, meta}) => (
                                <div className='email-input'>
                                    <input {...input} type= 'email' required/>
                                    <label htmlFor='email' className='login-lable'>
                                        <span className='login-span'>Email<small>*</small></span>
                                    </label>
                                    {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
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
                        <Field type='password' name='password'>
                            {({input, meta}) => (
                            <div className='password-input'>
                                <input {...input} type='password' required />
                                <label htmlFor='password' className='login-lable'>
                                    <span className='login-span'>Password<small>*</small></span>
                                </label>
                                {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                            </div>
                            )}
                        </Field>
                        <Field type='password' name='passwordconfirm'>
                            {({input, meta}) => (
                            <div className='password-input'>
                                <input {...input} type='password' required />
                                <label htmlFor='passwordconfirm' className='login-lable'>
                                    <span className='login-span'>Confirm Password<small>*</small></span>
                                </label>
                                {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                            </div>
                            )}
                        </Field>
                        <button type="submit" disabled={submitting}>Submit</button>
                    </form>
                    )}
            />
        </section>
        )
    return content
}
