import {Form, Field} from 'react-final-form';
import { Link } from 'react-router-dom';
function Login(){
    const onSubmit = () =>(
        window.alert('aaaaa')
    )
    return(
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
    )
};

export default Login