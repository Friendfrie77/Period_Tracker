import axios from "axios";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";
import {useNavigate} from 'react-router-dom';

const useLogout = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = useSelector((state) => state.userId);

    const dispatchLogout = () =>{
        dispatch(
            setLogout()
        );
        navigate('/')
    }

    //deletes Guest account when user logs out of it.

    const guestLogout = () =>{
        const userID = id;
        dispatchLogout();

    }
    return{ dispatchLogout,}
};
export default useLogout;