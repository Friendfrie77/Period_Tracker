import {Form, Field} from 'react-final-form';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import Spinner from '../../components/Spinner';
import {AiOutlineClose} from 'react-icons/ai'
function Login(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errormsg, setError] = useState()
    const [regError, setRegError] = useState();
    async function onSubmit(values){
        setLoading(true)
        let email = values.email
        let password = values.password
        const loginTry = await axios.post(`${process.env.REACT_APP_APIURL}/auth/login`,{
            email, password
        }).catch(function (error){
            if(error.response){
                setError(error.response.data.error)
            }
            setLoading(false)
        });
        const user = await loginTry
        if (user){
            console.log(user)
            dispatch(
                setLogin({
                  user: user.data.user.username,
                  email: user.data.user.email,
                  token: user.data.accessToken,
                  cycle: user.data.user.cycle,
                  avgLength: user.data.avgLength,
                  periodStartDate: user.data.user.periodStartDate,
                  periodEndDate: user.data.user.periodEndDate,
                  previousPeriod: user.data.user.previousPeriod,
                  isBleeding: user.data.user.isBleeding,
                  canBleed: user.data.user.canBleed,
                  notification: user.data.user.notification
                })
              );
              navigate('/home')
        };
    }
    const content = loading ? <Spinner /> : (
        <section className='login-wrapper'>
            <AiOutlineClose onClick={props.onShow} className='exit-button' />
            <Form
                onSubmit={onSubmit}
                validate = {values => {
                    const errors= {}
                    if (!values.email){
                        errors.email = 'Required'
                    }
                    if (!values.password){
                        errors.password = 'Required'
                    }
                    return errors
                }}
                render = {({handleSubmit, form, submitting, pristine, values}) =>(
                    <form onSubmit={handleSubmit}>
                        <h1>Sign In</h1>
                        <span className='message warning'>{errormsg}</span>
                        <Field name='email'>
                            {({input, meta})=> (
                            <div className='email-input'>
                                <input {...input} type='email' required />
                                <label htmlFor='email' className='login-lable'>
                                    <span className='login-span'>Email<small>*</small></span>
                                </label>
                                {meta.error && meta.touched && setError('Invaild email')}
                            </div>
                            )}
                        </Field>
                        <Field name='password'>
                            {({input, meta}) => (
                                <div className='password-input'>
                                    <input {...input} type ='password' required></input>
                                    <label htmlFor='password' className='login-lable'>
                                        <span className='login-span'>Password<small>*</small></span>
                                    </label>
                                    {meta.error && meta.touched && setError('Required')}
                                </div>
                            )}
                        </Field>
                        {/* <div className='remember-me'>
                            <input type='checkbox' id='remember' name='chkbox'></input>
                            <label htmlFor='chkbox'>Remember Me</label>
                        </div> */}
                        <button type='submit' disabled={submitting}>Login</button>
                    </form>
                )}
            />
        </section>
    )
    return content
};

export default Login