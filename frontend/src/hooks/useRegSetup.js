import {React ,useState} from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { setPeriod } from "../state";

const useRegSetup = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useSelector((state) => state.email)
    const token = useSelector((state) => state.token)
    const [isLoading, setLoading] = useState(null)
    
    const regNewUser = (val) =>{
        let {email, username, password} = val
        console.log(email, username, password)
        setLoading(true)

    }
    return {regNewUser ,isLoading}
}
export default useRegSetup;