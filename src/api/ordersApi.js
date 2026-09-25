import { api } from "./api";

export const createOrder = (data, accessToken) => api.post('/orders', data,
    { headers: {Prefer: "return=representation"}})

export const getAllOrders = (userId)=> api.get(`/orders?user_id=eq.${userId}&order=created_at.desc`)
export const getOrderById = (orderId)=>api.get(`/orders?id=eq.${orderId}`)

// order item
export const createOrderItem = (data)=>api.post('/order_items',data,{
    headers:{
        Prefer:"return=representation"
    }
})

export const getAllOrderItems = ()=>api.get('/order_items?order=created_at.desc')

export const getOrderItemById = (orderId)=>api.get(`/order_items?order_id=eq.${orderId}`)