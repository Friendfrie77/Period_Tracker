import React, { useState } from 'react';
import Login from '../loginPage/Login';
import SignUp from '../signupPage/SignUp';
function Index() {
    const [loginOpen, setLogin] = useState(false)
    const [newAccount, setAccount] = useState(false)
    const openLogin = () =>{
        setLogin(!loginOpen)
    }
    const openNewAccount = () =>{
        setAccount(!newAccount)
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
                    <Login onShow={openLogin} />
                </div>
            }
            {newAccount &&
                <div className='page-fade'>
                    <SignUp onShow={openNewAccount} />
                </div>
            }
        </section>
    )
  return content
}

export default Index
