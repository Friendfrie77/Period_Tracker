import {React, useState} from 'react'
import Nav from '../navbar/Nav'
import Login from '../loginPage/Login';
import SignUp from '../signupPage/SignUp';
import Phone from '../../images/phone.png'
import Footer from '../footer/Footer';
const IndexPage = () => {
  const [loginOpen, setLogin] = useState(false)
  const [regOpen, setReg] = useState(false)
  const handleDataReceiveLogin = (data) => {
    setLogin(data);
  };
  const handleDataReceiveReg =(data) =>{
    setReg(data)
  }
  const openLogin = () =>{
    setLogin(!loginOpen);
  }
  const openReg = () =>{
    setReg(!regOpen);
  }
  const content =(
    <section className='page-wrapper'>
      <Nav onDataSentLogin={handleDataReceiveLogin} onDataSentReg = {handleDataReceiveReg} />
      <div className='content'>
        <div className='hero'>
          <div className='hero-content-wrapper'>
            <div className="call-to-action">
              <div className='cta-statment'>
                <h1>Experience Red Moon Diary</h1>
                <p>Stay organized and informed about your menstrual cycle with our period tracker. Receive helpful text alerts to keep you on track.</p>
              </div>
              <div className='cta-new-account'>
                <h2>Get started below and start staying informed today</h2>
                <button className='button cta-button' onClick={(openReg)}>Sign Up</button>
              </div>
            </div>
            <div className='hero-img'>
              <img src={Phone} width='auto' height='90%'/>
            </div>
          </div>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet nibh praesent tristique magna sit amet purus gravida. Et netus et malesuada fames ac. Malesuada pellentesque elit eget gravida cum sociis. Fermentum leo vel orci porta. Massa massa ultricies mi quis hendrerit. Pharetra pharetra massa massa ultricies mi quis hendrerit. Eros donec ac odio tempor orci. Proin sed libero enim sed. Donec enim diam vulputate ut. Vel orci porta non pulvinar. Magna fringilla urna porttitor rhoncus. Pharetra vel turpis nunc eget lorem. Suspendisse faucibus interdum posuere lorem ipsum. Vestibulum lorem sed risus ultricies. Velit ut tortor pretium viverra suspendisse potenti nullam. Ut lectus arcu bibendum at varius vel. Leo integer malesuada nunc vel.</p>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet nibh praesent tristique magna sit amet purus gravida. Et netus et malesuada fames ac. Malesuada pellentesque elit eget gravida cum sociis. Fermentum leo vel orci porta. Massa massa ultricies mi quis hendrerit. Pharetra pharetra massa massa ultricies mi quis hendrerit. Eros donec ac odio tempor orci. Proin sed libero enim sed. Donec enim diam vulputate ut. Vel orci porta non pulvinar. Magna fringilla urna porttitor rhoncus. Pharetra vel turpis nunc eget lorem. Suspendisse faucibus interdum posuere lorem ipsum. Vestibulum lorem sed risus ultricies. Velit ut tortor pretium viverra suspendisse potenti nullam. Ut lectus arcu bibendum at varius vel. Leo integer malesuada nunc vel.</p>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet nibh praesent tristique magna sit amet purus gravida. Et netus et malesuada fames ac. Malesuada pellentesque elit eget gravida cum sociis. Fermentum leo vel orci porta. Massa massa ultricies mi quis hendrerit. Pharetra pharetra massa massa ultricies mi quis hendrerit. Eros donec ac odio tempor orci. Proin sed libero enim sed. Donec enim diam vulputate ut. Vel orci porta non pulvinar. Magna fringilla urna porttitor rhoncus. Pharetra vel turpis nunc eget lorem. Suspendisse faucibus interdum posuere lorem ipsum. Vestibulum lorem sed risus ultricies. Velit ut tortor pretium viverra suspendisse potenti nullam. Ut lectus arcu bibendum at varius vel. Leo integer malesuada nunc vel.</p>
        </div>
        {loginOpen &&
          <div className='page-fade'>
              <Login onShow={openLogin}/>
          </div>
        }
        {regOpen &&
          <div className='page-fade'>
            <SignUp onShow={openReg} />
          </div>
        }
      </div>
      <Footer />
    </section>
  )
  return content
  }

  export default IndexPage


