import { NavLink } from 'react-router-dom';
import { CiLogout, CiLogin } from 'react-icons/ci';
import logo2 from '../../images/logo2.svg'
import usePeriodInfo from '../../hooks/usePeriodInfo';
import useLogout from '../../hooks/useLogout';

const Nav = ({onDataSentLogin, onDataSentReg}) => {
    const {role, token, id} = usePeriodInfo();
    const {dispatchLogout, guestLogout} = useLogout();
    const guestLogoutButton = () =>{
        guestLogout(role, token, id)
    }
    const openLogin = () =>{
        onDataSentLogin(true)
    }
    const openRegister = () =>{
        onDataSentReg(true)
    }
    const navbar = (
        <header>
            <nav className='nav'>
                <div className='nav-container'>
                    <div className='logo'>
                        <img src={logo2} height='50px' width='50px'></img>
                    </div>
                    <input id='mobile-nav-toggle' type='checkbox' /> 
                    <label className='mobile-nav-container' htmlFor='mobile-nav-toggle'>
                        <div className='mobile-nav' id ='mobile-nav'></div>
                    </label>
                    <ul className='nav-links' id='nav-links'>
                        {/* {isLoggedIn ? (
                            <li className='stats'>
                                <h3>Information at a Glance</h3>
                                <span>Cycle Length: {cycle} days</span><br/>
                                <span>Average Length: {avgLength} days </span><br />
                                <span>Periods Logged: {previousPeriod.length}</span>
                            </li>
                        ) : null} */}
                        {token ? (
                            <>
                            <li className='nav-item'>
                                <NavLink to='/home'>Home</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/periodinfo'>Period Info</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/profile'>Profile</NavLink>
                            </li>
                            {role === 'User' ? (
                                <li className='logout'>
                                    <button onClick={dispatchLogout}>
                                        <CiLogout></CiLogout>
                                    </button>
                                </li>
                            ): (
                                <li className='logout'>
                                    <button onClick={guestLogoutButton}>
                                        <CiLogout></CiLogout>
                                    </button>
                                </li>
                            )}
                            {/* <li className='logout'>
                                <button onClick={logout}>
                                    <CiLogout></CiLogout>
                                </button>
                            </li> */}
                            </>
                        ): (
                            <>
                            <li className='nav-item'>
                                {/* <button onClick={openLogin}>Login <CiLogin /></button> */}
                                <button className='nav-button' onClick={openLogin}>Login</button>
                            </li>
                            <li className='nav-item'>
                                <button className='nav-cta' onClick={openRegister}>Register</button>
                            </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    )
    return navbar
}

export default Nav
