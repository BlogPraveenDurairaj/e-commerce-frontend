import { api } from "./api";

export const postWishlist = (userId, productId, accessToken) => api.post('/wishList', {
    user_id: userId,
    product_id: productId
}, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
        Prefer: "return=representation"
    }
})

export const fetchWishlist = (userId, accessToken) => api.get(`/wishList?user_id=eq.${userId}`, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    }
})

export const deleteWishlist = (wishlistId, accessToken) => api.delete(`/wishList?id=eq.${wishlistId}`, {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})

export const fetchAllWishList = (wishlistIds) => api.get(`/products?id=in.(${wishlistIds.join(',')})`);