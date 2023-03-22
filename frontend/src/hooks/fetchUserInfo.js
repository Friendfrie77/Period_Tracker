import {setUserInfo } from '../state';
import axios from "axios";
import { useDispatch } from 'react-redux';

async function useFetchUserInfo(email, token){
    const dispatch = useDispatch();
    const result = axios.post(`${process.env.REACT_APP_APIURL}/user/getuserinfo`,{
      email
      },{
        headers: {'Authorization': `Bearer ${token}`},
      }
    )
    const user = await result
    if (user){
        const userInfo = {
          periodStartDate: user.data.user.periodStartDate,
          avgLength: user.data.user.avgLength,
          cycle: user.data.user.cycle,
          periodEndDate: user.data.user.periodEndDate,
          previousPeriod: user.data.user.previousPeriod,
          canBleed: user.data.user.canBleed,
          isBleeding: user.data.user.isBleeding
        }
      return(userInfo)
    }
    else{
        return(null)
    }
}


export{useFetchUserInfo}