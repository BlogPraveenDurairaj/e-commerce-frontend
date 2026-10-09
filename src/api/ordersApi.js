
import { PaginationLimit } from "../static";
import { api } from "./api";

export const createOrder = (data, accessToken) => api.post('/orders', data,
    { headers: { Prefer: "return=representation" } })

// get user own all orders 
export const getAllOrders = (userId) => api.get(`/orders?user_id=eq.${userId}&order=created_at.desc`)
// get user single order by id
export const getOrderById = (orderId) => api.get(`/orders?id=eq.${orderId}`)
// get all user orders for admin
export const getAllOrdersByAdmin = (page) => {
    const params = new URLSearchParams();

    let limit = PaginationLimit
    let offset = (page - 1) * limit
    params.append('select', '*')
    params.append('limit', limit)
    params.append('offset', offset)
    return api.get(`/orders?${params.toString()}`, {
        headers: {
            Prefer: "count=exact"
        }
    })
}
// update order status
export const updateOrderStatus = (orderId,status)=> api.patch(`orders?id=eq.${orderId}`,{
    status:status
},{
    headers:{
        Prefer:'return=representation'
    }
})


// order item
export const createOrderItem = (data) => api.post('/order_items', data, {
    headers: {
        Prefer: "return=representation"
    }
})

export const getAllOrderItems = () => api.get('/order_items?order=created_at.desc')

export const getOrderItemById = (orderId) => api.get(`/order_items?order_id=eq.${orderId}`)