import axios from "axios";

async function fetchUserInfo(email, token){
    const result = axios.post(`${process.env.REACT_APP_APIURL}user/getuserinfo`,{
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

export {fetchUserInfo}