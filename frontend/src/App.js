import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignupForm from './pages/signupPage/SignUp'
import { useSelector } from "react-redux";
import Home from './pages/homePage/Home'
import Login from './pages/loginPage/Login'
import Spinner from './components/Spinner';
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
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/accountsetup' element={ <AccountSetup/>} />
                <Route path='/signup' element={<SignupForm />} />
                <Route path='/' element={<Login />} />
                <Route path='/test' element={<Spinner />} />
                <Route path='/home' element= {isAuth ? <Home /> : <Navigate to='/' />}/>
            </Routes>
        </BrowserRouter>
);
}


export default App;
