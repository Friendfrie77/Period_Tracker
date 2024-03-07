import Nav from '../navbar/Nav'
import BlankCountdown from '../../components/BlankCountdown';
import Footer from '../footer/Footer';
import HomepageHeader from '../../components/homePageName/HomepageHeader';
const NeedInfo = (props) => {
  return (
    <div className='page-wrapper'>
        <Nav />
          <section className="home content">
          <HomepageHeader userName = {props.userName} />
          <div className="period-countdown">
              <h2>Error: 2 or more sequential periods needed to track</h2>
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

