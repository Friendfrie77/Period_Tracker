import React, { useEffect, useState } from 'react';
import Login from '../loginPage/Login';
import SignUp from '../signupPage/SignUp';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
function Index() {
    const [loginOpen, setLogin] = useState(false)
    const [newAccount, setAccount] = useState(false)
    const [loading, setLoading] = useState(false);
    const [err, setErrMsg] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const openLogin = () =>{
        setLogin(!loginOpen)
    }
    const openNewAccount = () =>{
        setAccount(!newAccount)
    }
    const errMsg = (msg) =>{
        setErrMsg(msg)
    }
    const regNewAccount = async (values) =>{
        let email = values.email
        let username = values.username
        let password = values.password
        setLoading(true)
        try{
            const results = await axios.post(`${process.env.REACT_APP_APIURL}/register`,{
                email, username, password
            })
            const result = await results
            if (result){
                const login = await axios.post(`${process.env.REACT_APP_APIURL}/auth/login`,{
                    email, password
            });
            const user = await login
            if (user){
                dispatch(
                    setLogin({
                        user: user.data.user.username,
                        email: user.data.user.email,
                        token: user.data.accessToken,
                        cycle: user.data.user.cycle,
                        avgLength: user.data.avgLength,
                        periodStartDate: user.data.user.periodStartDate,
                        periodEndDate: user.data.user.periodEndDate,
                        previousPeriod: user.data.user.previousPeriod,
                        isBleeding: user.data.user.isBleeding,
                        canBleed: user.data.user.canBleed,
                        notification: user.data.user.notification
                    })
                  );
                  navigate('/AccountSetup')
                }
            }
        }catch(err){
            if(err.response.status === 401){
                setErrMsg(err.response.data.msg)
                setLoading(false)
            }
        }
    }

    const content = (
        <section className='index-wrapper content'>
            <div className='index-background-img'></div>
            <h1>Welcome,</h1>
            <p>You can use this simple web application to track your menstrual cycle. More features are being added soon. Please note this application is still in the early stages, as a result, the accuracy of the tracking is still being tweaked, and pages might be a little slow to load.</p>
            <hr></hr>
            <div className='login-button-container'>
                <span>Already have an account? <button onClick={openLogin}>Login here</button></span>
                <span className='signup'>or you can<button onClick={openNewAccount}>make one here</button></span>
            </div>
            {loginOpen &&
                <div className='page-fade'>
                    <Login onShow={openLogin}/>
                </div>
            }
            {newAccount &&
                <div className='page-fade'>
                    <SignUp onShow={openNewAccount} onSubmit = {regNewAccount} loading ={loading} setErr = {errMsg} err = {err}/>
                </div>
            }
        </section>
    )
  return content
}

export default Index
