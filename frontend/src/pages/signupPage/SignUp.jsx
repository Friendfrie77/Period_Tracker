import {Form, Field} from 'react-final-form';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios'
import { setLogin } from '../../state';
import { useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';

export default function SignUp(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [err, setErrMsg] = useState();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values) =>{
        let email = values.email
        let username = values.username
        let password = values.password
        setLoading(true)
        try{
            const results = await axios.post(`${process.env.REACT_APP_APIURL}/register`,{
                email, username, password
            })
            const result = await results
            if (result){
                const login = await axios.post(`${process.env.REACT_APP_APIURL}/auth/login`,{
                    email, password
            });
            const user = await login
            if (user){
                dispatch(
                    setLogin({
                      user: user.data.user.username,
                      email: user.data.user.email,
                      token: user.data.accessToken,
                      cycle: user.data.user.cycle,
                      periodStartDate: user.data.user.periodStartDate,
                      periodEndDate: user.data.user.periodEndDate,
                      previousPeriod: user.data.user.previousPeriod,
                    })
                  );
                  navigate('/AccountSetup')
                }
            }
        }catch(err){
            console.log(err)
            setErrMsg(err)
        }
    }
    const content = loading ? <Spinner /> : (
        <section className='login-wrapper'>
            <h1>Sign Up</h1>
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
    return content
}
