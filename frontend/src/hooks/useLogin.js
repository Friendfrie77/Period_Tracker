import axios from "axios";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import {useNavigate} from 'react-router-dom';

const useLogin = () => {
  const [isLoading, setLoading] = useState(null);
  const [loginError, setError] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (email, password) => {
    try{
        setLoading(true)
        const loginAPI = await axios.post(`${process.env.REACT_APP_APIURL}/auth/login`,{
            email, password
        })
        const UserData = loginAPI.data.user;
        dispatch(
            setLogin({
                  user: UserData.username,
                  email: UserData.email,
                  userId: loginAPI.data.userId.id,
                  token: loginAPI.data.accessToken,
                  cycle: UserData.cycle,
                  avgLength: loginAPI.data.avgLength,
                  periodStartDate: UserData.periodStartDate,
                  periodEndDate: UserData.periodEndDate,
                  previousPeriod: UserData.previousPeriod,
                  isBleeding: UserData.isBleeding,
                  canBleed: UserData.canBleed,
                  notification: UserData.notification
            })
        )
        setLoading(false)
        navigate('/home')
    }catch(error){
        setError(error.response.data.error)
        setLoading(false)
    }
  };
  return { login, isLoading, loginError};
};

export default useLogin;
