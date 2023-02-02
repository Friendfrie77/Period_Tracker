import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
    name: 'auth',
    initialState: {email: null, user : null, token: null},
    reducers:{
        setCredentials: (state, action)=>{
            const{email, user, refreshToken} = action.payload
            state.email = email
            state.user = user
            state.token = refreshToken
        },
        logOut: (state, action) =>{
            state.email = null
            state.user = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentToken = (state) => state.auth.token