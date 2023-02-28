import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    email: null,
    token : null,
    cycle: null,
    avgLength: null,
    periodStartDate: null,
    periodEndDate: null,
    daysTillPeriod: null,
    canBleed: false,
    isBleeding: false, 
    daysleft: null,
    previousPeriod: [{
        startDate: null,
        endDate: null,
        count: null
    }],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) =>{
            state.user = action.payload.user;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.cycle = action.payload.cycle;
            state.avgLength = action.payload.avgLength
            state.periodStartDate = action.payload.periodStartDate;
            state.periodEndDate = action.payload.periodEndDate
            state.daysTillPeriod = action.payload.cycle;
            state.canBleed = action.payload.canBleed;
            state.isBleeding = action.payload.isBleeding;
            state.previousPeriod = action.payload.previousPeriod;
        },
        setLogout: (state) =>{
            state.user = null;
            state.token = null;
            state.cycle = null;
            state.daysTillPeriod = null;
            state.periodStartDate = null;
            state.periodEndDate = null;
            state.daysTillPeriod = null;
            state.canBleed = false;
            state.isBleeding = false;
            state.previousPeriod = null;
        },
        setPeriod: (state, action) =>{
            state.previousPeriod = action.payload.previousPeriod
        },
        setCycle: (state, action) =>{
            state.cycle = action.payload.cycle;
            state.avgLength = action.payload.avgLength;
        },
        setNewPeriod: (state, action) => {
            state.periodStartDate = action.payload.periodStartDate;
            state.periodEndDate = action.payload.periodEndDate;
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
        setDays: (state, action) =>{
            state.daysleft = action.payload.daysleft;
        }
    }
})

export const {setLogin, setLogout, setPeriod, setCycle, setNewPeriod, setUserInfo, setIsBleeding, setCanBleed, setDays} = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentToken = (state) => state.auth.token

export default authSlice.reducer;