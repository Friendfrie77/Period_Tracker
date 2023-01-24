import {Form, Field} from 'react-final-form';
import {redirect, useNavigate} from 'react-router-dom';
import {axios} from 'axios';

const onSubmit = async values =>{
    // navigate = useNavigate()
    window.alert(JSON.stringify(values,0,2))
    // navigate('/login')
    // redirect('/login')
}

const SignupForm = () =>(
    <section className='login-wrapper'>
        <h1>SignUp In</h1>
        <Form
         onSubmit={onSubmit}
         validate = {values => {
            const errors = {}
            if (!values.email){
                errors.email = 'Required'
            }
            if (!values.username){
                errors.username = 'Required'
            }
            if (!values.password){
                errors.password = 'Required'
            }
            if (!values.passwordconfirm){
                errors.passwordconfirm = 'Required'
            }else if (values.password !== values.passwordconfirm){
                errors.passwordconfirm = 'Must match'
            }
            return errors
         }}
         render = {({handleSubmit, form, submitting, pristine, values}) =>(
            <form onSubmit={handleSubmit}>
                <Field name='email' >
                    {({input, meta}) => (
                    <div className='email-input'>
                        <input {...input} type= 'email' required/>
                        <label htmlFor='email' className='login-lable'>
                            <span className='login-span'>Email<small>*</small></span>
                        </label>
                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                    </div>
                    )}
                </Field>
                <Field name='username'>
                    {({input, meta})=> (
                    <div className='username-input'>
                        <input {...input} type='text' required />
                        <label htmlFor='username' className='login-lable'>
                            <span className='login-span'>Username<small>*</small></span>
                        </label>
                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                    </div>
                    )}
                </Field>
                <Field type='password' name='password'>
                    {({input, meta}) => (
                    <div className='password-input'>
                        <input {...input} type='password' required />
                        <label htmlFor='password' className='login-lable'>
                            <span className='login-span'>Password<small>*</small></span>
                        </label>
                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                    </div>
                    )}
                </Field>
                <Field type='password' name='passwordconfirm'>
                    {({input, meta}) => (
                    <div className='password-input'>
                        <input {...input} type='password' required />
                        <label htmlFor='passwordconfirm' className='login-lable'>
                            <span className='login-span'>Confirm Password<small>*</small></span>
                        </label>
                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                    </div>
                    )}
                </Field>
                <button type="submit" disabled={submitting}>Submit</button>
            </form>
        )}
        />
    </section>
)

export default SignupForm