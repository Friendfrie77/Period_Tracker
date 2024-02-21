import { React, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPeriod, setLogin } from "../state";
import usePeriodInfo from "./usePeriodInfo";

const useAccountSetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);
  const token = useSelector((state) => state.token);
  const userInfo = useSelector((state) => state.previousPeriod);
  const [isLoading, setLoading] = useState(null);
  const {loggedPeriods} = usePeriodInfo();
  const sendAccountInfo = async (loggedPeriods) => {
    try {
      setLoading(true);
      const addNewAPICall = await axios.post(
        `${process.env.REACT_APP_APIURL}/user/newuser`,
        {
          email,
          loggedPeriods,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        setPeriod({
          previousPeriod: addNewAPICall.data.previousPeriod,
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
    console.log(UserData)
    console.log(demoAccountAPICall.data.userInfo)
    dispatch(
      setLogin({
            user: UserData.username,
            email: UserData.email,
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
