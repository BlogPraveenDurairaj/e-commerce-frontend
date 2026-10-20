import { PaginationLimit } from "../static";
import { api } from "./api";
export const getProducts = (page = 1, category, sort = "asc", search = '') => {
    let params = new URLSearchParams()
    params.append("select", "*");

    let limit = PaginationLimit;
    const offset = (page - 1) * limit
    params.append("limit", limit)
    params.append("offset", offset)
    if (category) {
        params.append('category', `eq.${category}`)
    }
    if (search) {
        params.append("title", `ilike.%${search}%`)
    }
    if (sort) {
        params.append("order", `price.${sort},id.asc`)
    }
    return api.get(`/products?${params.toString()}`, {
        headers: {
            Prefer: "count=exact",
        }
    })
}
export const getAllProducts = ()=> api.get('/products')

export const getProductById = (id) => api.get(`/products?id=eq.${id}&select='*`)

export const deleteProductByID = (id) => api.delete(`/products?id=eq.${id}`,{
    headers:{
        Prefer: "return=representation"
    }
})

export const createProduct = (data)=>api.post('/products',data,{
    headers:{
        Prefer:'return=representation'
    }
})

export const updateProduct = (id,data)=> api.put(`/products?id=eq.${id}`,data,{
    headers:{
        Prefer:'return=representation'
    }
})
