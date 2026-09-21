import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createOrder, getAllOrders } from "../api/ordersApi"

export const createOrderData = createAsyncThunk('orders/createOrder', async ({ data, accessToken }, { rejectWithValue }) => {
    console.log(data, accessToken)
    try {
        const res = await createOrder(data, accessToken)
        console.log(res)
        return res

    } catch (err) {
        console.log(err.response.data)
        return rejectWithValue(err.message)

    }
})

export const getOrdersData = createAsyncThunk('orders/getAllOrders', async (_, { rejectWithValue, getState }) => {
    try {
        const { user } = getState().auth
        console.log(user.id,'user')
        const res = await  getAllOrders(user.id)
        return res.data
    } catch (err) {
        return rejectWithValue(err.message || "something wrong")
    }
})

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        orderDetails: null,
        loading: false,
        error: null,
        checkoutFormValid: false
    },
    reducers: {
        addOrderDetails(state, action) {
            state.orderDetails = action.payload
            state.checkoutFormValid = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrdersData.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
        })
            .addCase(getOrdersData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getOrdersData.pending, (state) => {
                state.loading = true
            })
    }
})

export const { addOrderDetails } = orderSlice.actions

export default orderSlice.reducer