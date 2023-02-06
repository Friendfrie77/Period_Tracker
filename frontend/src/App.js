import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignupForm from './pages/signupPage/SignUp'
import { useSelector } from "react-redux";
import Home from './pages/homePage/homePage'
import Login from './pages/loginPage/Login'
import Spinner from './components/Spinner';
import Nav from './pages/navbar/Nav'
import Layout from "./components/Waves";
import AccountSetup from "./pages/accountSetupPage/AccountSetup";
function App() {
    const isAuth = Boolean(useSelector((state) => state.token));
    const newAccount = useSelector((state) => state.previousPeriod);
    let isNew;
    function newAccountCheck(newAccount){
        if (newAccount.length < 1){
            isNew = true;
        }else{
            isNew = false;
        }
    }
    newAccountCheck(newAccount)
    console.log(newAccount.length)
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/test1' element={ isNew ? <AccountSetup/> : <Login />} />
                <Route path='/Signup' element={<SignupForm />} />
                <Route path='/' element={<Login />} />
                <Route path='/test' element={<Spinner />} />
                <Route path='/home' element= {isAuth ? <Home /> : <Navigate to='/' />}/>
            </Routes>
        </BrowserRouter>
);
}


export default App;
