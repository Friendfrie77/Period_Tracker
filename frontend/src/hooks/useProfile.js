import axios from 'axios';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { setLogout } from '../state';

const useProfile = () =>{
    //Redux States
    const userRole = useSelector((state) => state.role);
    const userEmail = useSelector((state) => state.email);
    const userId = useSelector((state) => state.userId);
    const token = useSelector((state) => state.token);
    //Normal States
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteAccount = (confirmEmail) =>{
        if(userRole === "Guest"){
            //fix backend logic
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
    const changePassword = async (oldPassword, newPassword) =>{
        const passwordChangeCall = await axios.post(`${process.env.REACT_APP_APIURL}/auth/changepassword`,{
            userId, oldPassword, newPassword
        }, {
            headers: {'Authorization': `Bearer ${token}`}
        });
        console.log(passwordChangeCall)
    }

    const oldPasswordChange = (password) =>{
        setOldPassword(password.target.value)
    }
    const newPasswordChange = (password) =>{
        setNewPassword(password.target.value)
    }
      const confirmPassword = (password) =>{
        setConfirmPassword(password.target.value)
    }

    return{deleteAccount, setOldPassword, setNewPassword, setConfirmPassword, changePassword,oldPasswordChange, newPasswordChange, confirmPassword, oldPassword, newPassword, confirmNewPassword}
}
export default useProfile;