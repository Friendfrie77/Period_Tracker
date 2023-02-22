import Nav from '../navbar/Nav'
import BlankCountdown from '../../components/BlankCountdown';
const NeedInfo = (props) => {
  return (
    <div className='page-wrapper'>
        <Nav />
        <section className="home">
        <h1>Welcome back, {props.userName}</h1>
        <div className="placeholder"></div>
        <div className="period-countdown">
            <h2>Error</h2>
            <BlankCountdown message = {props.message}></BlankCountdown>
        </div>
        <div className="check-period">
            <label htmlFor = 'check-period'>Has your period started?</label>
            <button name='check-period' type='button' onClick={props.onClick}>Yes</button>
        </div>
        </section>
    </div>
  )
}

export default NeedInfo

