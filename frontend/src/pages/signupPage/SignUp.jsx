
import {React ,useState} from "react";
import {Form, Field} from 'react-final-form';
import Spinner from '../../components/Spinner';
import {AiOutlineClose} from 'react-icons/ai';
import {passwordRegex} from '../../utils/password-regex';
import useRegSetup from '../../hooks/useRegSetup';

export default function SignUp(props){
    const {regNewUser ,isLoading} = useRegSetup();
    const [vaildReg, setVaildReg] = useState(false)
    const onSubmit = async (values) => {
        const res = regNewUser(values);
        if(res){
            console.log(res)
            props.setErr(await res);
        }
    }
    const content = isLoading ? <Spinner /> : (
        <section className='login-wrapper'>
            <AiOutlineClose onClick={props.onShow} className='exit-button' />
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
                } else{
                    const regex = passwordRegex(values.password, values.passwordconfirm)
                    if(!regex.isVaild){
                        errors.password = regex.msg
                        // props.setErr(regex.msg)
                    }if(regex.isVaild && props.err){
                        props.setErr(regex.msg)
                    }
                }
       
                return errors
             }}
             render = {({handleSubmit, form, submitting, pristine, values, valid}) =>(
                <form onSubmit={handleSubmit}>
                    {/* <span className='message-warning'>{props.err}</span> */}
                    <h1>Sign Up</h1>
                    <Field name='email'>
                        {({input, meta}) => (
                        <div className='email-input'>
                            <input {...input} type= 'email' required/>
                            <label htmlFor='email' className='login-lable'>
                                <span className='login-span'>Email<small>*</small></span>
                            </label>
                            {meta.error && meta.touched && <span className='error'>{meta.error} test</span>}
                        </div>
                        )}
                    </Field>
                    <Field name='username'>
                        {({input, meta})=> (
                        <div className='username-input'>
                            <input {...input} type='text' required />
                            <label htmlFor='username' className='login-lable'>
                                <span className={`login-span ${meta.error ? `span-error` : ''}`}>Username<small>*</small></span>
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
                    <button type="submit" disabled={!valid}>Submit</button>
                </form>
            )}
            />
        </section>
    )
    return content
}
