import {React ,useState} from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { setLogin } from "../state";

const useRegSetup = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(null)
    
    const regNewUser = async (val) =>{
        let {email, username, password} = val
        console.log(email, username, password)
        setLoading(true)
        try{
            const newUser = await axios.post(`${process.env.REACT_APP_APIURL}/register`,{
                email,
                username, 
                password
            })
            if(newUser){
                console.log(newUser)
                dispatch(
                    setLogin({
                        user: newUser.data.newUser.username,
                        email: newUser.data.newUser.email,
                        token: newUser.data.accessToken,
                        cycle: newUser.data.newUser.cycle,
                        avgLength: newUser.data.newUser.avgLength,
                        periodStartDate: newUser.data.newUser.periodStartDate,
                        periodEndDate: newUser.data.newUser.periodEndDate,
                        previousPeriod: newUser.data.newUser.previousPeriod,
                        isBleeding: newUser.data.newUser.isBleeding,
                        canBleed: newUser.data.newUser.canBleed,
                        notification: newUser.data.newUser.notification
                    })
                )
            }
            setLoading(false);
            navigate('/accountsetup');
        }catch(err){
            setLoading(false)
            return err.response.data.error;
        }
    }
    return {regNewUser ,isLoading}
}
export default useRegSetup;