//hook to manage user period info and any function that uses that info
import { useState } from "react";
import Moment from "moment";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsBleeding,
  setPeriod,
  setPeriodStatus,
  setPeriodInfo,
} from "../state";

const useUserInfo = () => {
  //states
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.userId);
  const role = useSelector((state) => state.role);
  const previousPeriod = useSelector((state) => state.previousPeriod);
  const userName = useSelector((state) => state.user)
  const email = useSelector((state) => state.email)
  const cycle = useSelector((state) => state.cycle);
  const periodEndDate = useSelector((state) => state.periodEndDate);
  const periodStartDate = useSelector((state) => state.periodStartDate);
  const canBleed = useSelector((state) => state.canBleed);
  const isBleeding = useSelector((state) => state.isBleeding);
  const loggedPeriods = useSelector((state) => state.previousPeriod)
  const [isLoading, setLoading] = useState(null);
  //imports
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const [periodMessage, setPMessage] = useState();
//   const [loggedPeriods, setLoggedPeriods] = useState([]);
  //vars
  let todaysDate = new Date();
  todaysDate = Moment(todaysDate).format("YYYY-MM-DD");
  const cycleStartDate = Moment(periodStartDate).subtract(cycle, "days");
  const tokenHeader = { Authorization: ` Bearer ${token}` };

  // console.log(token, role, id)
  // console.log(previousPeriod)
  const removePeriod = async (removeDate) => {
    if (!removeDate) {
      setMessage("Please select a date");
    } else {
      try {
        const removeAPICall = await axios.post(
          `${process.env.REACT_APP_APIURL}/user/removePeriod`,
          {
            id,
            role,
            removeDate,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (removeAPICall.status === 201) {
          dispatch(
            setPeriod({
              previousPeriod: removeAPICall.data.previousPeriod,
            })
          );
          setMessage(removeAPICall.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const addPeriod = async (loggedPeriods) => {
    try {
      const addNewAPICall = await axios.post(
        `${process.env.REACT_APP_APIURL}/user/newuser`,
        {
          id,
          role,
          loggedPeriods,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPMessage(`${addNewAPICall.data.message}!`);
      dispatch(
        setPeriod({
          previousPeriod: addNewAPICall.data.previousPeriod,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDates = (dates) => {
    let period = [
      {
        startDate: Moment(dates[0].startDate).format('YYYY-MM-DD'),
        endDate: Moment(dates[0].endDate).format('YYYY-MM-DD'),
      },
    ];
    if (period[0].startDate !== period[0].endDate) {
      if (loggedPeriods === null) {
        dispatch(
            setPeriod({
                previousPeriod: period
            })
        )
      } else {
          if(!checkIfDateIsPresent(loggedPeriods, period)){
              dispatch(
                  setPeriod({
                      previousPeriod: [...previousPeriod, ...period]
                  })
              )
            }
        }
    }
    // clearDates()
  };

const clearDates = () =>{
  dispatch(
    setPeriod({
        previousPeriod: null
    })
  )
};
//checks if a period date is in the current list of logged periods
  const checkIfDateIsPresent = (loggedPeriods, period) => {
    const result = loggedPeriods.some(dateSet => dateSet.startDate === period[0].startDate || dateSet.endDate === period[0].endDate);
    return result;
  }
  const fuckthisshit = () =>{
    dispatch(
        setPeriod({
            previousPeriod: null
        })
    )
  }

  const sendPeriodStatus = async (newEndDate) => {
    const periodStatusApiCall = await axios.post(
      `${process.env.REACT_APP_APIURL}/user/updateperiod`,
      {
        id,
        periodStartDate,
        newEndDate,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const bloodGod = periodStatusApiCall.data;
    dispatch(
      setPeriodStatus({
        canBleed: bloodGod.canBleed,
        isBleeding: bloodGod.isBleeding,
      })
    );
  };
  const updatePeriodStatus = async (isBleeding, canBleed) => {
    console.log("this trigger");
    const periodStatusApiCall = await axios.post(
      `${process.env.REACT_APP_APIURL}/user/setperiodinfo`,
      {
        id,
        role,
        isBleeding,
        canBleed,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const bloodGod = periodStatusApiCall.data;
    dispatch(
      setPeriodStatus({
        canBleed: bloodGod.canBleed,
        isBleeding: bloodGod.isBleeding,
      })
    );
  };

  const freedomFromBloodGod = async () => {
    let newPrevPeriod;
    if (periodEndDate !== todaysDate) {
      newPrevPeriod = [
        [
          ...previousPeriod,
          { startDate: periodStartDate, endDate: todaysDate },
        ],
      ];
    } else {
      newPrevPeriod = [
        [...previousPeriod],
        { startDate: periodStartDate, endDate: periodEndDate },
      ];
    }
    dispatch(
      setPeriod({
        previousPeriod: newPrevPeriod,
      })
    );
    dispatch(
      setIsBleeding({
        isBleeding: false,
      })
    );
    const addNewPrevPeriodAPICall = await axios.post(
      `${process.env.REACT_APP_APIURL}/user/addpreviousperiod`,
      {
        id,
        role,
        newPrevPeriod,
      },
      {
        headers: tokenHeader,
      }
    );
    //need to hadd handling for error
  };

  const nullCurrentDates = async () => {
    setLoading(true);
    const nullDateApiCall = await axios.post(
      `${process.env.REACT_APP_APIURL}/user/nullperioddates`,
      {
        id,
        role,
      },
      {
        headers: tokenHeader,
      }
    );
    const apiData = nullDateApiCall.data.newUserInfo;
    dispatch(
      setPeriodInfo({
        periodStartDate: apiData.periodStartDate,
        periodEndDate: apiData.periodEndDate,
        daysTillPeriod: apiData.daysTill,
        cycle: apiData.cycle,
        avgLength: apiData.avgLength,
      })
    );
    setLoading(false);
  };

  return {
    removePeriod,
    addPeriod,
    updateUserDates,
    fuckthisshit,
    sendPeriodStatus,
    updatePeriodStatus,
    freedomFromBloodGod,
    nullCurrentDates,
    checkIfDateIsPresent,
    message,
    periodMessage,
    loggedPeriods,
    cycleStartDate,
    todaysDate,
    cycle,
    periodStartDate,
    periodEndDate,
    canBleed,
    isBleeding,
    isLoading,
    role,
    token,
    id,
    previousPeriod, 
    userName,
    email
  };
};
export default useUserInfo;
