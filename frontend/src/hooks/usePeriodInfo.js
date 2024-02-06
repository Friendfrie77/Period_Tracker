import {React ,useState} from "react";
import Moment from 'moment';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setPeriod } from "../state";

const usePeriodInfo = () =>{
    const token = useSelector((state) => state.token)
    const email = useSelector((state) => state.email)
    const dispatch = useDispatch();
    const [message, setMessage] = useState()
    const [periodMessage, setPMessage] = useState()

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
    return{removePeriod, addPeriod, message,periodMessage}
}
export default usePeriodInfo