import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignupForm from './pages/signupPage/SignUp'
import { useSelector } from "react-redux";
import Home from './pages/homePage/Home'
import Login from './pages/loginPage/Login'
import Proflie from "./pages/profilePage/Proflie";
import PeriodInfo from "./pages/periodInfo/PeriodInfo";
import AccountSetup from "./pages/accountSetupPage/AccountSetup";
import Test from "./components/Test";
function App() {
    const isAuth = Boolean(useSelector((state) => state.token));
    const newAccount = useSelector((state) => state.previousPeriod);
    let isNew;
    // function newAccountCheck(newAccount){
    //     if (newAccount.length < 1){
    //         isNew = true;
    //     }else{
    //         isNew = false;
    //     }
    // }
    // newAccountCheck(newAccount)
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/accountsetup' element={ <AccountSetup/>} />
                <Route path='/signup' element={<SignupForm />} />
                <Route path='/' element={<Login />} />
                <Route path='/profile' element={ isAuth ? <Proflie /> : <Navigate to='/' />} />
                <Route path='/periodinfo' element={isAuth ? <PeriodInfo /> : <Navigate to='/' />} />
                <Route path='/home' element= {isAuth ? <Home /> : <Navigate to='/' />}/>
                <Route path='/Test1' element= {<Test />} />
            </Routes>
        </BrowserRouter>
);
}


export default App;
