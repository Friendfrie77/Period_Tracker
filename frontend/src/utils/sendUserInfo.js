import axios from "axios";

const sendPeriodStatus = async (email, isBleeding, canBleed, token) => {
    axios.post(`${process.env.REACT_APP_APIURL}/user/setperiodinfo`,{
      email, isBleeding, canBleed
    },{
      headers: {'Authorization': `Bearer ${token}`},
    })
  }

const sendUpdatedPeriod = async (email, periodStartDate, periodEndDate, token) => {
const user = axios.post(`${process.env.REACT_APP_APIURL}/user/updateperiod`, {
    email, periodStartDate, periodEndDate
},{
    headers: {'Authorization': `Bearer ${token}`},
})
return user
}

const sendPreviousPeriod = async (email, previousPeriod, token) => {
axios.post(`${process.env.REACT_APP_APIURL}/user/addpreviousperiod`, {
    email, previousPeriod
},{
    headers: {'Authorization': `Bearer ${token}`},
})
}

const removeCurrentDates = async(email, token) =>{
    const user = axios.post(`${process.env.REACT_APP_APIURL}/user/nullperioddates`, {
        email
    },{
        headers: {'Authorization': `Bearer ${token}`},
    })
    return user
}
  export{sendPeriodStatus, sendUpdatedPeriod, sendPreviousPeriod, removeCurrentDates}