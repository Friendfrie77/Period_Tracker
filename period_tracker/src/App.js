import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './components/pages/index/index';
import Login from './components/pages/login/Login';
import SignUp from './components/pages/login/SignUp';
import PrivateRoutes from './components/utils/PrivateRoutes';


function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route element={<Index />} path = '/' exact />
                </Route>
                <Route element={<Login />} path='/login' />
                <Route element={<SignUp />} path='/signup' />
            </Routes>
        </Router>
);
}


export default App;
