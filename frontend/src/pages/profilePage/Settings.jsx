import React from 'react'
import { useSelector } from "react-redux";

function Settings(props) {
    const accountType = useSelector((state) => state.role)
  return (
    <div className='warning-box'>
        <span>{props.erroMsg}</span>
        <div className='inner-account-settings'>
            {accountType === 'Guest' && <h1>Some settings not avilable on guest account</h1>}
            <div className='setting-option'>
                <button onClick={props.openPassword}>Password Change</button>
            </div>
            <div className='setting-option'>
                <button disabled= {accountType === 'Guest'} onClick={props.openNotication}>Toggle Notication</button>
            </div>
            <div className='setting-option'>
                <button onClick={props.openDeleteBox}>Delete Account</button>
            </div>
            <button className='text-button' onClick={props.close}>Go Back</button>
        </div>
    </div>
  )
}

export default Settings
