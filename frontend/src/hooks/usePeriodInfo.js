//hook to manage user period info and any function that uses that info
import {useState} from "react";
import Moment from 'moment';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setPeriod, setPeriodStatus } from "../state";

const usePeriodInfo = () =>{
    //states
    const token = useSelector((state) => state.token)
    const id = useSelector((state) => state.userId);
    const email = useSelector((state) => state.email)
    const cycle = useSelector((state) => state.cycle)
    const periodEndDate = useSelector((state) => state.periodEndDate)
    const periodStartDate = useSelector((state) => state.periodStartDate)
    //imports
    const dispatch = useDispatch();
    const [message, setMessage] = useState()
    const [periodMessage, setPMessage] = useState()
    const [loggedPeriods, setLoggedPeriods] =useState([])
    //vars
    let todaysDate = new Date()
    todaysDate = Moment(todaysDate).format('YYYY-MM-DD')
    const cycleStartDate = Moment(periodStartDate).subtract(cycle, 'days')
    console.log(id,email)
    const removePeriod = async (removeDate) =>{
        if(!removeDate){
            setMessage('Please select a date')
        }else{
            try{
                const removeAPICall = await axios.post(`${process.env.REACT_APP_APIURL}/user/removePeriod`,{
                    email, removeDate},{
                        headers: {'Authorization' : `Bearer ${token}`},
                    })
                if (removeAPICall.status === 201){
                    dispatch(
                        setPeriod({
                            previousPeriod: removeAPICall.data.previousPeriod
                        })
                    )
                    setMessage(removeAPICall.data.message)
                }
            }catch(error){
                console.log(error)
            }
        }
    }
    const addPeriod = async (loggedPeriods) =>{
        try{
            const addNewAPICall = await axios.post(`${process.env.REACT_APP_APIURL}/user/newuser`,{
                email, loggedPeriods},{
                    headers: {'Authorization': `Bearer ${token}`},
                })
            setPMessage(`${addNewAPICall.data.message}!`)
            dispatch(
                setPeriod({
                    previousPeriod: addNewAPICall.data.previousPeriod
                })
            )
        }catch(error){
            console.log(error)
        }        
    }

    const updateUserDates = (dates) =>{
        let period = [{
            startDate: Moment(dates[0].startDate).format(),
            endDate: Moment(dates[0].endDate).format()
        }]
        //prob dont need array of arrays here
        if(period[0].startDate !== period[0].endDate){
            if(loggedPeriods.length === 0){
                setLoggedPeriods(period)
            }else{
                setLoggedPeriods([...loggedPeriods, ...period])
            }
        }
    }
    const sendPeriodStatus = async (newEndDate) =>{
        const periodStatusApiCall = await axios.post(`${process.env.REACT_APP_APIURL}/user/updateperiod`, {
            id, periodStartDate, newEndDate
        },{
            headers: {'Authorization': `Bearer ${token}`
        },
        });
        const bloodGod = periodStatusApiCall.data
        dispatch(
            setPeriodStatus({
                canBleed: bloodGod.canBleed,
                isBleeding: bloodGod.isBleeding,
            })
        )
    }
    const updatePeriodStatus = async(isBleeding, canBleed) =>{
        console.log('this trigger')
        const periodStatusApiCall = await axios.post(`${process.env.REACT_APP_APIURL}/user/setperiodinfo`,{
            id, isBleeding, canBleed
        },{
            headers: {'Authorization': `Bearer ${token}`},
        }
        )
        const bloodGod = periodStatusApiCall.data
        dispatch(
            setPeriodStatus({
                canBleed: bloodGod.canBleed,
                isBleeding: bloodGod.isBleeding,
            })
        )
    }
    return{removePeriod, addPeriod, updateUserDates, setLoggedPeriods, sendPeriodStatus, updatePeriodStatus, message, periodMessage, loggedPeriods, cycleStartDate, todaysDate}
}
export default usePeriodInfo