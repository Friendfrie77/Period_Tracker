import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignupForm from './pages/signupPage/SignUp'
import { useSelector } from "react-redux";
import Home from './pages/homePage/homePage'
import Login from './pages/loginPage/Login'
import Spinner from './components/spinner';
import Nav from './pages/navbar/Nav'
import AccountSetup from "./pages/accountSetupPage/AccountSetup";
function App() {
    const isAuth = Boolean(useSelector((state) => state.token));
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/test1' element={<AccountSetup/>} />
                <Route path='/Signup' element={<SignupForm />} />
                <Route path='/' element={<Login />} />
                <Route path='/test' element={<Spinner />} />
                <Route path='/home' element= {isAuth ? <Home /> : <Navigate to='/' />}/>
            </Routes>
        </BrowserRouter>
);
}


export default App;
