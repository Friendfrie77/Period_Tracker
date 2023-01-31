import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from 'axios';

const PrivateRoutes = () =>{
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    // const isAuth = async (token, setAuth) => {
    //     const vaild = await axios.post('http://localhost:8080/authToken', {
    //         token,
    //         id
    //     })
    //     const isVaild = vaild.data.isVaild
    //     setAuth(isVaild)
    //     return isVaild
    // }
    let auth 
    useEffect(() =>{
        const isAuth = async (token, id) => {
            const vaild = await axios.post('http://localhost:8080/authToken', {
                token,
                id
            })
            const isVaild = vaild.data.isVaild
            let auth = isVaild
            console.log(auth)
        };
        isAuth(token, id);
    },[]);
    return(
        auth ?  <Outlet /> : <Navigate to= '/login'/>
    )
}

export default PrivateRoutes