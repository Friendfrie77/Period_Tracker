import {useRef, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { CiLogout, CiLogin } from 'react-icons/ci'
import { setLogout } from '../../state';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import logo from '../../images/logo.svg'
import logo2 from '../../images/logo2.svg'
import Login from '../loginPage/Login';

const Nav = ({onDataSentLogin, onDataSentReg}) => {
    const dispatch = useDispatch();
    const cycle = useSelector((state) => state.cycle);
    const avgLength = useSelector((state) => state.avgLength)
    const previousPeriod = useSelector((state) => state.previousPeriod)
    const isLoggedIn = Boolean(useSelector((state) => state.token))
    const logout = () =>{
        dispatch(
            setLogout()
        )
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
                        {isLoggedIn ? (
                            <li className='stats'>
                                <h3>Information at a Glance</h3>
                                <span>Cycle Length: {cycle} days</span><br/>
                                <span>Average Length: {avgLength} days </span><br />
                                <span>Periods Logged: {previousPeriod.length}</span>
                            </li>
                        ) : null}
                        {isLoggedIn ? (
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
                            <li className='logout'>
                                <button onClick={logout}>
                                    <CiLogout></CiLogout>
                                </button>
                            </li>
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
