import {React, useState} from 'react'
import Nav from '../navbar/Nav'
import Login from '../loginPage/Login';
import SignUp from '../signupPage/SignUp';
import Phone from '../../images/phone.png'
import Laptop from '../../images/laptop.jpg'
import Footer from '../footer/Footer';
import IndexInfoCards from '../../components/indexPageCards/IndexInfoCards';
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
  const colors ={
    color1: '#8FDDC3',
    color2: '#241E4E',
    color4: '#5C0F47',
    color5: '#8FDDC3',
    color6: '#5CFFC9',
    textcolor:'#EAE8FF',
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
        <IndexInfoCards 
          heading = "Tracking Your Period: Made Easy"
          styles = {{backgroundColor: colors.color2, color: colors.textcolor}}
          contentTypeOne = 'img'
          contentOne = {Laptop}
          contentTypeTwo = 'txt'
          txtHeader= 'test'
        />
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


