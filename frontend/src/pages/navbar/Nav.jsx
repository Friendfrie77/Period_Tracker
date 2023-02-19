import {useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci'
import { setLogout } from '../../state';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
const Nav = () => {
    const dispatch = useDispatch();
    const cycle = useSelector((state) => state.cycle);
    const avgLength = useSelector((state) => state.avgLength)
    const previousPeriod = useSelector((state) => state.previousPeriod)

    const logout = () =>{
        dispatch(
            setLogout()
        )
    }

  return (
    <nav className='nav'>
        <div className='logo'>
            placeholder
        </div>
        <input id='mobile-nav-toggle' type='checkbox' />
        <label className='mobile-nav-container' htmlFor='mobile-nav-toggle'>
            <div className='mobile-nav' id = 'mobile-nav'></div>
        </label>
        <ul className='nav-links' id='nav-links'>
            <li className='stats'>
                <h3>Information at a Glance</h3>
                <span>Cycle Lenght: {cycle} days</span><br/>
                <span>Average Length: {avgLength} days </span><br />
                <span>Periods Logged: {previousPeriod.length}</span>
            </li>
            <li className='nav-item'>
                <NavLink to='/home'>
                    Home
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to='/profile'>
                    Profile
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to='/periodinfo'>
                    Period Info
                </NavLink>
            </li>
            <li className='logout'>
                <button onClick={logout}>
                    <CiLogout></CiLogout>
                </button>
            </li>
        </ul>
    </nav>
  )
}

export default Nav
