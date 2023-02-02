import {useRef} from 'react';


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
        
    </nav>
  )
}

export default Nav
