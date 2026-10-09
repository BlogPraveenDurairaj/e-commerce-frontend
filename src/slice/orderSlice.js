import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createOrder, getAllOrderItems, getAllOrders, getAllOrdersByAdmin, getOrderById, getOrderItemById, updateOrderStatus } from "../api/ordersApi"
// create order
export const createOrderData = createAsyncThunk('orders/createOrder', async ({ data, accessToken }, { rejectWithValue }) => {
    console.log(data, accessToken)
    try {
        const res = await createOrder(data, accessToken)
        return res.data[0]

    } catch (err) {
        console.log(err.response.data)
        return rejectWithValue(err.message)

    }
})
// get all order data by admin
export const getAllOrdersByAdminData = createAsyncThunk('orders/getAllOrdersByAdmin', async (page, { rejectWithValue }) => {
    try {
        const res = await getAllOrdersByAdmin(page)
        let countRange = res.headers["content-range"].split('/')[1]
        return { data: res.data, totalItem: countRange }
    } catch (err) {
        return rejectWithValue(err)
    }
})

// get all order data by user
export const getOrdersData = createAsyncThunk('orders/getAllOrders', async (_, { rejectWithValue, getState }) => {
    try {
        const { user } = getState().auth
        const res = await getAllOrders(user.id)
        return res.data
    } catch (err) {
        return rejectWithValue(err.message || "something wrong")
    }
})

// get single order data
export const getOrderDataById = createAsyncThunk('orders/getOrderById', async (orderId, { rejectWithValue }) => {
    try {
        const res = await getOrderById(orderId)
        return res.data[0]
    } catch (err) {
        return rejectWithValue(err.message || "data not fetched")
    }
})

// get all order item data
export const getAllOrderItemsData = createAsyncThunk('order/getOrderItems', async (_, { rejectWithValue }) => {
    try {
        const res = await getAllOrderItems()
        return res.data
    } catch (err) {
        return rejectWithValue(err.message || 'data not fetched')
    }
})

export const getOrderItemDataById = createAsyncThunk('order/getOrderItemsById', async (orderId, { rejectWithValue }) => {
    try {
        const res = await getOrderItemById(orderId)
        return res.data
    } catch (err) {
        return rejectWithValue(err.message || "data not fetched")
    }
})

// update order status
export const updateOrderStatusData = createAsyncThunk('order/updateOrderStatus', async ({ orderId, status }, { rejectWithValue }) => {
    try {
        const res = await updateOrderStatus(orderId, status)
        return res.data[0]
    } catch (err) {
        return rejectWithValue(err.message || 'Not data updated')
    }
})

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        totalOrders: [],
        totalOrdersCount: null,
        orders: [],
        orderItems: [],
        orderDetails: null,
        orderDetailsEdit: false,
        loading: false,
        viewOrder: {
            viewOrderLoading: false,
            viewOrderData: null,
            viewOrderItemData: null,
            error: null
        },
        error: null,
        checkoutFormValid: false
    },
    reducers: {
        addOrderDetails(state, action) {
            state.orderDetails = action.payload
            state.checkoutFormValid = true
        },
        removeOrderDetails(state) {
            state.orderDetails = null
            state.checkoutFormValid = false
        },
        editOrderDetails(state) {
            state.checkoutFormValid = false
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
            .addCase(getAllOrderItemsData.fulfilled, (state, action) => {
                state.orderItems = action.payload
            })
            .addCase(getAllOrderItemsData.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(getOrderDataById.pending, (state) => {
                state.viewOrder.viewOrderLoading = true
            })
            .addCase(getOrderDataById.fulfilled, (state, action) => {
                state.viewOrder.viewOrderLoading = false
                state.viewOrder.viewOrderData = action.payload
            })
            .addCase(getOrderDataById.rejected, (state, action) => {
                state.viewOrder.viewOrderLoading = false
                state.viewOrder.error = action.payload
            })
            .addCase(getOrderItemDataById.pending, (state) => {
                state.viewOrder.viewOrderLoading = true
            })
            .addCase(getOrderItemDataById.fulfilled, (state, action) => {
                state.viewOrder.viewOrderLoading = false
                state.viewOrder.viewOrderItemData = action.payload
            })
            .addCase(getOrderItemDataById.rejected, (state, action) => {
                state.viewOrder.viewOrderLoading = false
                state.viewOrder.error = action.payload
            })
            .addCase(getAllOrdersByAdminData.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllOrdersByAdminData.fulfilled, (state, action) => {
                console.log(action.payload, 'totalItem')
                state.loading = false
                state.totalOrders = action.payload.data
                state.totalOrdersCount = action.payload.totalItem
            })
            .addCase(getAllOrdersByAdminData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // update status
            .addCase(updateOrderStatusData.fulfilled, (state, action) => {
                state.totalOrders = state.totalOrders.map((item)=> item.id === action.payload.id ? action.payload : item)
            })
    }
})

export const { addOrderDetails, removeOrderDetails, editOrderDetails } = orderSlice.actions

export default orderSlice.reducer