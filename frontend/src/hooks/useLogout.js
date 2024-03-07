import axios from "axios";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";
import {useNavigate} from 'react-router-dom';

const useLogout = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dispatchLogout = () =>{
        dispatch(
            setLogout()
        );
        // navigate('/')
    }

    //deletes Guest account when user logs out of it.

    const guestLogout = async (role, token, id) =>{
        console.log('test')
        const deleteAccountAPI = await axios.post(
            `${process.env.REACT_APP_APIURL}/auth/deleteuser`,
            {
                role,
                id
            },
            {
                headers: {Authorization: `Bearer ${token}`},
            })
        console.log(deleteAccountAPI)
        dispatchLogout();
    }
    return{ dispatchLogout, guestLogout}
};
export default useLogout;