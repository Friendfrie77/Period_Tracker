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
    const [message, setMessage] = useState({
        type: null,
        message: null
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteAccount = async (values) =>{
        if(userRole === "Guest"){
            try{
                const deleteAccountAPICall = await axios.post(`${process.env.REACT_APP_APIURL}/auth/deleteuser`,{
                    userRole, userId
                },{
                    headers: {'Authorization' : `Bearer ${token}`},
                })
                setMessage({
                    type: 'success',
                    message: deleteAccountAPICall.data.messege
                })
                dispatch(
                    setLogout()
                )
                navigate('/')
            }catch(err){
                setMessage({
                    type: 'error',
                    msg: err.response.data.message
                })
            }
        }else{
            try{
                if(values.email !== userEmail){
                    throw new Error('Email does not match account Email.');
                }else{
                    const deleteAccountAPICall = await axios.post(`${process.env.REACT_APP_APIURL}/auth/deleteuser`,{
                        userRole, userId
                    },{
                        headers: {'Authorization' : `Bearer ${token}`},
                    })
                    setMessage({
                        type: 'success',
                        message: deleteAccountAPICall.data.messege
                    })
                    dispatch(
                        setLogout()
                    )
                    navigate('/')
                }
            }catch(err){
                if(err.message){
                    setMessage({
                        type: 'error',
                        message: err.message
                    })
                }else if(err.response.data.message){
                    setMessage({
                        type: 'error',
                        msg: err.response.data.message
                    })
                }
            }
        }
    }
    const changePassword = async (values) =>{
        const {oldPassword, newPassword} = values
        try{
            const passwordChangeCall = await axios.post(`${process.env.REACT_APP_APIURL}/auth/changepassword`,{
                userId, oldPassword, newPassword
            }, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            const res = passwordChangeCall.data.message;
            setMessage({
                type:'success',
                msg: res
            })
        }catch(err){
            setMessage({
                type: 'error',
                msg: err.response.data.message
            })
        }
    }



    return{deleteAccount, changePassword, message, userRole}
}
export default useProfile;