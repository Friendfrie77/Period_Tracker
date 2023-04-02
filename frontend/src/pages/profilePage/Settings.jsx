import React from 'react'
function Settings(props) {
  return (
    <div className='warning-box'>
        <div className='inner-account-settings'>
            <div className='setting-option'>
                <button onClick={props.openPassword}>Password Change</button>
            </div>
            <div className='setting-option'>
                <button onClick={props.openNotication}>Toggle Notication</button>
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
