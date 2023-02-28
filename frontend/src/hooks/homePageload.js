import { useFetchUserInfo } from "./fetchUserInfo";
import { useAvgPeriodLength, useEstimateDate} from "./calcPeriodInfo"
import { useEffect } from "react";

async function useHomePageLoad(email, token, previousPeriod, periodStartDate, periodEndDate, cycle, avgLength){

        useFetchUserInfo(email, token)
        useAvgPeriodLength(previousPeriod)
        useEstimateDate(periodStartDate, periodEndDate, previousPeriod, cycle, avgLength)
        return('test')
}

export {useHomePageLoad}