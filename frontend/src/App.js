import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignupForm from './pages/signupPage/SignUp'
import { useSelector } from "react-redux";
import Home from './pages/homePage/Home'
import Index from './pages/index/Index'
import Proflie from "./pages/profilePage/Proflie";
import PeriodInfo from "./pages/periodInfo/PeriodInfo";
import AccountSetup from "./pages/accountSetupPage/AccountSetup";

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
                <Route path='/accountsetup' element={ isAuth ? <AccountSetup/> : <Navigate to='/' />} />
                <Route path='/signup' element={<SignupForm />} />
                <Route path='/' element={<Index />} />
                <Route path='/profile' element={ isAuth ? <Proflie /> : <Navigate to='/' />} />
                <Route path='/periodinfo' element={isAuth ? <PeriodInfo /> : <Navigate to='/' />} />
                <Route path='/home' element= {isAuth ? <Home /> : <Navigate to='/' />}/>
            </Routes>
        </BrowserRouter>
);
}


export default App;
