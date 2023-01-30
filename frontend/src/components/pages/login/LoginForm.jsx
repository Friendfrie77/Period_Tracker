import {Form, Field} from 'react-final-form';
import { Link } from 'react-router-dom';
const onSubmit = () =>(
    window.alert('aaaaa')
)
const LoginForm = () =>(
    <div className='page-wrapper'>
        <section className='login-wrapper'>
            <h1>Sign In</h1>
            <Form
                onSubmit={onSubmit}
                render = {({handleSubmit, form}) =>(
                <form onSubmit={handleSubmit}>
                    <div className='username-input'>
                        <input type="text" name='username' required></input>
                        <label htmlFor='username' className='login-lable'>
                            <span className='login-span'>Username<small>*</small></span>
                        </label>
                    </div>
                    <div className='password-input'>
                        <input type='password' name='password' required></input>
                        <label htmlFor='password' className='login-lable'>
                            <span className='login-span'>Password<small>*</small></span>
                        </label>
                    </div>
                    <div className='remember-me'>
                        <input type='checkbox' id='remember' name='chkbox'></input>
                        <label htmlFor='chkbox'>Remember Me</label>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            )}
            />
            <Link className='recover'>Forgot your username or password?</Link>
            <hr></hr>
            <div className='sign-up'>
                <span>New?</span>
                <Link to='/signup'>Create an account here</Link>
            </div>
        </section>
        <div className='bottom-wave'>
            <svg className='wave' width="100%" height="60" viewBox="10 0 360 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 28.7209L16.8333 30.7364C33.6667 32.7519 67.3333 36.7829 101 42.8295C134.667 48.876 168.333 56.938 202 48.876C235.667 40.814 269.333 16.6279 303 6.55039C336.667 -3.52713 370.333 0.503876 387.167 2.51938L404 4.53488V65H387.167C370.333 65 336.667 65 303 65C269.333 65 235.667 65 202 65C168.333 65 134.667 65 101 65C67.3333 65 33.6667 65 16.8333 65H0V28.7209Z" fill="#EAE8FF" fill-opacity="0.3"/>
            </svg>
            <svg className='wave' width="100vw" height="95" viewBox="0 0 360 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M-3 54.3805L17.2675 42.3525C37.2325 30.3245 77.7675 6.26844 118 1.11358C158.232 -4.04129 198.768 9.70502 239 21.733C279.233 33.7611 319.768 44.0708 339.733 49.2257L360 54.3805V75H339.733C319.768 75 279.233 75 239 75C198.768 75 158.232 75 118 75C77.7675 75 37.2325 75 17.2675 75H-3V54.3805Z" fill="#8FDDC3" fill-opacity="0.3"/>
            </svg>
        </div>
    </div>
)

export default LoginForm