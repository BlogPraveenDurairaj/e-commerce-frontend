import { createSlice } from "@reduxjs/toolkit";


const adminAuthSlice = createSlice({
    name: 'admin',
    initialState: {
        admin: null,
        session: null,
        isAuthenticated: false,
        loading:true
    },
    reducers: {
        setAdminAuth(state, action) {
            state.session = action.payload.session
            state.admin = action.payload.user
            state.isAuthenticated = true
            state.loading = false
        },
        adminLogout(state) {
            state.admin = null
            state.session = null
            state.isAuthenticated = false
            state.loading = false
        }
    }
})
export const { setAdminAuth, adminLogout } = adminAuthSlice.actions

export default adminAuthSlice.reducer