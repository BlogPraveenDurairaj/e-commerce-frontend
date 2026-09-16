import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    session: null,
    isAuthenticated: false,
    loading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.user = action.payload.user,
            state.session = action.payload.session,
            state.isAuthenticated = true,
            state.loading = false
        },
        logout(state) {
            state.user = null,
            state.session = null,
            state.isAuthenticated = false
            state.loading = false
        }
    }
})

export const { setAuth, logout } = authSlice.actions

export default authSlice.reducer