import { api } from "./api";
export const getProducts = (page = 1, category, sort = "asc", search = '') => {
    let params = new URLSearchParams()
      params.append("select", "*");

      let limit = 10;
      const offset = (page -1) * limit
      params.append("limit",limit)
      params.append("offset",offset)
    if (category) {
        params.append('category', `eq.${category}`)
    }
    if (search) {
        params.append("title", `ilike.%${search}%`)
    }
    if (sort) {
        params.append("order", `price.${sort}`)
    }
    return api.get(`/products?${params.toString()}`)
}

export const getProductById = (id) => api.get(`/products?id=eq.${id}&select='*`)