import {Field} from 'react-final-form';

import React from 'react'

function UserLogin(props) {
    const loginSection =                     
    <Field name={`${props.fieldName}`}>
    {({input, meta}) => (
    <div className='email-input'>
        <input {...input} type= {`${props.type}`} disabled = {props.isDisabled} required/>
        <label htmlFor={props.spanHtmlFor} className={`login-lable ${meta.error && meta.touched && !meta.active  ? `span-error` : ''}`}>
            <span className={`login-span ${props.isDisabled ? 'input-disabled' : ''}`}>{props.span}<small>*</small></span>
        </label>
        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
    </div>
    )}
    </Field>
    return loginSection;
}

export default UserLogin
