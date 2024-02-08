
import {Form, Field} from 'react-final-form';
import Spinner from '../../components/Spinner';
import {AiOutlineClose} from 'react-icons/ai';
import {passwordRegex} from '../../utils/password-regex';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import axios from 'axios';

export default function SignUp(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function onSubmit(values){
        props.setLoading(false)
        let email = values.email;
        let username = values.username;
        let password = values.password;
        const results = await axios.post(`${process.env.REACT_APP_APIURL}/register`,{
            email, username, password
        }).catch(function (error){
            if(error.response){
                props.setErr(error.response.data.error)
            }
            props.setLoading(false)
        });
        const user = await results
        if(user){
            dispatch(
                setLogin({
                  user: user.data.newUser.username,
                  email: user.data.newUser.email,
                  token: user.data.accessToken,
                  cycle: user.data.newUser.cycle,
                  avgLength: user.data.newUser.avgLength,
                  periodStartDate: user.data.newUser.periodStartDate,
                  periodEndDate: user.data.newUser.periodEndDate,
                  previousPeriod: user.data.newUser.previousPeriod,
                  isBleeding: user.data.newUser.isBleeding,
                  canBleed: user.data.newUser.canBleed,
                  notification: user.data.newUser.notification
                })
              );
              navigate('/accountsetup')
        }

    }
    const content = props.loading ? <Spinner /> : (
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
                        props.setErr(regex.msg)
                    }
                }
                return errors
             }}
             render = {({handleSubmit, form, submitting, pristine, values}) =>(
                <form onSubmit={handleSubmit}>
                    <span className='message-warning'>{props.err}</span>
                    <h1>Sign Up</h1>
                    <Field name='email'>
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
