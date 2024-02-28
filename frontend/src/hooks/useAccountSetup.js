import {useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPeriod, setLogin, setCycle, setNewPeriod, setPeriodInfo } from "../state";


const useAccountSetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);
  const id = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);
  const [isLoading, setLoading] = useState(null);
  const sendAccountInfo = async (loggedPeriods) => {
    try {
      setLoading(true);
      const addNewAPICall = await axios.post(
        `${process.env.REACT_APP_APIURL}/user/newuser`,
        {
          id,
          loggedPeriods,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(addNewAPICall)
      const periodInfo = addNewAPICall.data.periodInfo
      dispatch(
        setPeriod({
          previousPeriod: addNewAPICall.data.previousPeriod,
        }),
      );
      dispatch(
        setPeriodInfo({
          cycle: periodInfo.cycle,
          avgLength: periodInfo.avgLength,
          periodStartDate: periodInfo.periodStartDate,
          periodEndDate: periodInfo.periodEndDate,
          dayTillPeriod: periodInfo.daysTill,
        })
      );
      setLoading(false);
      navigate("/Home");
    } catch (err) {
      console.log(err);
    }
  };
  const sendDemoInfo = async (val,loggedPeriods) => {
    const username = val.name
    const demoAccountAPICall = await axios.post(
        `${process.env.REACT_APP_APIURL}/auth/demo`,{
            username,
            loggedPeriods
        }
    );
    const UserData = demoAccountAPICall.data.userInfo;
    console.log(demoAccountAPICall.data.userId.id)
    dispatch(
      setLogin({
            user: UserData.username,
            userId: demoAccountAPICall.data.userId.id,
            email: UserData.email,
            role: UserData.role,
            token: demoAccountAPICall.data.accessToken,
            cycle: UserData.cycle,
            avgLength: UserData.avgLength,
            periodStartDate: UserData.periodStartDate,
            periodEndDate: UserData.periodEndDate,
            previousPeriod: UserData.previousPeriod,
            isBleeding: UserData.isBleeding,
            canBleed: UserData.canBleed,
      })
  )
  navigate('/home')
  };
  return { sendAccountInfo, sendDemoInfo, isLoading };
};

export default useAccountSetup;
