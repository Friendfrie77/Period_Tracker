import axios from 'axios';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { setLogout } from '../state';

const useProfile = () =>{
    const userRole = useSelector((state) => state.role);
    const userEmail = useSelector((state) => state.email)
    const userId = useSelector((state) => state.userId)
    const token = useSelector((state) => state.token)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deleteAccount = (confirmEmail) =>{
        if(userRole === "Guest"){
            //fix backend logic
            console.log('test')
            axios.post(`${process.env.REACT_APP_APIURL}/auth/deleteuser`,{
                userRole ,userId
            },{
                headers:{'Authorization': `Bearer ${token}`},
            })
        }else{
            if(confirmEmail === userEmail){
                //fix case in route
                axios.post(`${process.env.REACT_APP_APIURL}/auth/deleteuser`,{
                    userEmail
                },{
                    headers:{'Authorization': `Bearer ${token}`},
                })
                dispatch(
                    setLogout()
                )
                navigate('/')
            }
        }
    }
    return{deleteAccount}
}
export default useProfile;