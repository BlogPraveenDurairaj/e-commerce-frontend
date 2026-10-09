import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRole } from "../api/adminAuthApi";

export const getRoleData = createAsyncThunk('admin/getRole', async ({user_id,access_token}, { rejectWithValue }) => {
    try {
        const res = await getRole(user_id, access_token)
        if(!res.data.length){
            return rejectWithValue('No access for this user')
        }
        return res.data[0]
    } catch (err) {
        return rejectWithValue(err.message)
    }
})



const adminAuthSlice = createSlice({
    name: 'admin',
    initialState: {
        admin: null,
        session: null,
        isAuthenticated: false,
        loading: true,
        role:null,
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
    },
    extraReducers: (builder) => {
        builder.addCase(getRoleData.pending, (state) => {
            state.loading = true
        })
            .addCase(getRoleData.fulfilled, (state, action) => {
                state.loading = false
                state.loginError = null
                state.role = action.payload.role
            })
            .addCase(getRoleData.rejected, (state) => {
                state.loading = false
            })
    }
})

export const { setAdminAuth, adminLogout } = adminAuthSlice.actions

export default adminAuthSlice.reducer