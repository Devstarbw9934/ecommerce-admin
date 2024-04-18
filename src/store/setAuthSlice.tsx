import { createSlice } from "@reduxjs/toolkit";

export const setAuthSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        isAuth: false,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
    }
});

export const { setToken, setIsAuth } = setAuthSlice.actions;

export default setAuthSlice.reducer;