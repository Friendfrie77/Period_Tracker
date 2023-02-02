import {useRef, useState, useEffect} from  'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../auth/authSlice';
import {useLoginMutation} from './loginAuthApiSlice';

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [erroMsg, setErrormsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const userData = await login({email, password}).unwrap()
            console.log(userData)
            dispatch(setCredentials({...userData, email}))
            setEmail('')
            setPassword('')
            navigate('/accountsetup')
        } catch(err){
            setErrormsg(err)
        }
    }
    const handleEmailInput = (e) =>setEmail(e.target.value)
    const handlePasswordInput = (e) =>setPassword(e.target.value)

    const content = isLoading ? <h1>Loading...</h1>:(
        <section className='login-wrapper'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className='email-input'>
                    <input
                        type='email'
                        id='email'
                        ref={userRef}
                        value = {email}
                        onChange = {handleEmailInput}
                        autoComplete = 'off'
                        required
                    />
                    <label htmlFor='email' className='login-lable'>
                        <span className='login-span'>Email<small>*</small></span>
                    </label>
                </div>
                <div className='password-input'>
                    <input
                        type='password'
                        id='password'
                        value = {password}
                        onChange = {handlePasswordInput}
                        autoComplete = 'off'
                        required
                    />
                    <label htmlFor='password' className='login-lable'>
                        <span className='login-span'>Password<small>*</small></span>
                    </label>
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </section>
    )
  return content
}

export default Login
