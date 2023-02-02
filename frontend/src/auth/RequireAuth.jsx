import { useLocation, Navigate, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser, selectCurrentEmail } from './authSlice';

const RequireAuth = () =>{
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)
    console.log(useSelector(selectCurrentEmail))
    const location = useLocation()
    console.log(location)
    console.log(user)
    console.log(token)
    console.log('test')
    return(
        token
        ? <Outlet />
        : <Navigate to='/login' state ={{from: location}} replace />
    )
}
export default RequireAuth