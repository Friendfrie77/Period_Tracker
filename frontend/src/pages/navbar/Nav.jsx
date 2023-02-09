import {useRef} from 'react';
import { NavLink } from 'react-router-dom';
const Nav = () => {
    const check = useRef(null)
    const checkChange = () =>{
        if(check.current.checked){
            check.current.checked = !check.current.checked
        }
    }

  return (
    <nav className='nav'>
        <div className='logo'>
            placeholder
        </div>
        <input id='mobile-nav-togggle' type='checkbox' ref={check} />
        <label className='mobile-nav-container' for='mobile-nav-toggle'>
            <div className='mobile-nav' id = 'mobile-nav'></div>
        </label>
        <ul className='nav-links' id='nav-links'>
            <li className='nav-item'>
                <NavLink to='/'>
                    Home
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to='/'>
                    Profile
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to='/'>
                    Log Period
                </NavLink>
            </li>
            <li className='logout'>
                Logout
            </li>
        </ul>
    </nav>
  )
}

export default Nav
