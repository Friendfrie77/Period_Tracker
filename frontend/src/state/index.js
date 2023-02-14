import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    email: null,
    token : null,
    cycle: null,
    periodStartDate: null,
    periodEndDate: null,
    daysTillPeriod: null,
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
            state.periodEndDate = action.payload.periodEndDate
            state.daysTillPeriod = action.payload.cycle;
            state.previousPeriod = action.payload.previousPeriod;
        },
        setLogout: (state) =>{
            state.user = null;
            state.token = null;
            state.cycle = null;
            state.daysTillPeriod = null;
            state.periodStartDate = null;
            state.periodEndDate = null;
        },
        setPeriod: (state, action) =>{
            state.previousPeriod = action.payload.previousPeriod
        },
        setCycle: (state, action) =>{
            state.cycle = action.payload.cycle
        },
        setNewPeriod: (state, action) => {
            state.periodStartDate = action.payload.periodStartDate;
            state.periodEndDate = action.payload.periodEndDate;
        },
        setUserInfo: (state, action) =>{
            state.periodStartDate = action.payload.periodStartDate;
            state.periodEndDate = action.payload.periodEndDate;
            state.previousPeriod = action.payload.previousPeriod
        }
    }
})

export const {setLogin, setLogout, setPeriod, setCycle, setNewPeriod, setUserInfo} = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentToken = (state) => state.auth.token

export default authSlice.reducer;