import Nav from '../navbar/Nav'
import BlankCountdown from '../../components/BlankCountdown';
import Footer from '../footer/Footer';
const NeedInfo = (props) => {
  return (
    <div className='page-wrapper'>
        <Nav />
          <section className="home content">
          <h1>Welcome back, {props.userName}</h1>
          <div className="period-countdown">
              <h2>Error</h2>
              <BlankCountdown message = {props.message}></BlankCountdown>
          </div>
          <div className="check-period">
              <label htmlFor = 'check-period'>Has your period started?</label>
              <button name='check-period' type='button' onClick={props.onClick}>Yes</button>
          </div>
          </section>
        <Footer />
    </div>
  )
}

export default NeedInfo

