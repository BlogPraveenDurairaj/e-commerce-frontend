import { api } from "./api";

export const createOrder = (data, accessToken) => api.post('/orders', data,
    {
        headers: {
            Prefer: "return=representation"
        }
    }
)

export const getAllOrders = (userId)=> api.get(`/orders?user_id=eq.${userId}`)