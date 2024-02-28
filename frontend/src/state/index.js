import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userId: null,
    role: null,
    email: null,
    token : null,
    cycle: null,
    avgLength: null,
    periodStartDate: null,
    periodEndDate: null,
    daysTillPeriod: null,
    canBleed: false,
    isBleeding: false,
    daysTill: null,
    daysleft: null,
    previousPeriod: [{
        startDate: null,
        endDate: null
    }],
    notification: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) =>{
            state.user = action.payload.user;
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.cycle = action.payload.cycle;
            state.avgLength = action.payload.avgLength
            state.periodStartDate = action.payload.periodStartDate;
            state.periodEndDate = action.payload.periodEndDate
            state.daysTillPeriod = action.payload.cycle;
            state.canBleed = action.payload.canBleed;
            state.isBleeding = action.payload.isBleeding;
            state.previousPeriod = action.payload.previousPeriod;
            state.notification = action.payload.notification;
        },
        setLogout: (state) =>{
            state.user = null;
            state.role = null;
            state.token = null;
            state.cycle = null;
            state.daysTillPeriod = null;
            state.periodStartDate = null;
            state.periodEndDate = null;
            state.daysTillPeriod = null;
            state.canBleed = false;
            state.isBleeding = false;
            state.previousPeriod = null;
            state.notification = false;
        },
        setPeriod: (state, action) =>{
            state.previousPeriod = action.payload.previousPeriod
        },
        setCycle: (state, action) =>{
            state.cycle = action.payload.cycle;
            state.avgLength = action.payload.avgLength;
        },
        setPeriodInfo: (state, action) => {
            state.periodStartDate = action.payload.periodStartDate;
            state.periodEndDate = action.payload.periodEndDate;
            state.daysTillPeriod = action.payload.daysTillPeriod;
            state.cycle = action.payload.cycle;
            state.avgLength = action.payload.avgLength;
        },
        setNewPeriod: (state, action) => {
            state.periodStartDate = action.payload.periodStartDate;
            state.periodEndDate = action.payload.periodEndDate;
            state.daysTillPeriod = action.payload.daysTillPeriod;
        },
        setUserInfo: (state, action) =>{
            state.periodStartDate = action.payload.periodStartDate;
            state.periodEndDate = action.payload.periodEndDate;
            state.cycle = action.payload.cycle;
            state.avgLength = action.payload.avgLength;
            state.canBleed = action.payload.canBleed;
            state.isBleeding = action.payload.isBleeding;
            state.previousPeriod = action.payload.previousPeriod;
        },
        setCanBleed: (state, action) =>{
            state.canBleed = action.payload.canBleed;
        },
        setIsBleeding: (state, action) =>{
            state.isBleeding = action.payload.isBleeding;
        },
        setPeriodStatus: (state, action) =>{
            state.canBleed = action.payload.canBleed;
            state.isBleeding = action.payload.isBleeding;
        },
        setDays: (state, action) =>{
            state.daysleft = action.payload.daysleft;
        },
        setNotificationStatus: (state, action) =>{
            state.notification = action.payload.notification
        }
    }
})

export const {setLogin, setLogout, setPeriod, setCycle, setNewPeriod, setUserInfo, setIsBleeding, setCanBleed, setPeriodStatus, setDays, setNotificationStatus, setPeriodInfo} = authSlice.actions;

export default authSlice.reducer;