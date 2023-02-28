import {setUserInfo } from '../state';
import axios from "axios";
import { useDispatch } from 'react-redux';

async function useFetchUserInfo(email, token){
    const dispatch = useDispatch();
    const result = axios.post('http://localhost:8080/user/getuserinfo',{
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
          canBleed: user.data.canBleed,
          isBleeding: user.data.isBleeding
        }
      return(userInfo)
    }
    else{
        return(null)
    }
}

export{useFetchUserInfo}