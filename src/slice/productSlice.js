import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductById, deleteProductByID, createProduct, updateProduct, getAllProducts } from "../api/productApi";
import toast from "react-hot-toast";
// get product 
export const getProductsData = createAsyncThunk('products/getProducts', async ({ page, category, sort, search, isPagination }, { rejectWithValue }) => {

    try {
        const res = await getProducts(page, category, sort, search, isPagination)
        let contentRange = res.headers["content-range"]
        const total = Number(contentRange.split("/")[1]);
        return { data: res.data, page: page, total: total, isPagination: isPagination }

    } catch (err) {
        return rejectWithValue(err.message || "something went wrong")
    }
})

// get all products
export const getAllProductsData = createAsyncThunk('products/getAll', async (_, { rejectWithValue }) => {
    try {
        const res = await getAllProducts()
        return res.data
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

// get single product
export const getProductByIdData = createAsyncThunk('product/getProductById', async (id, { rejectWithValue }) => {
    try {
        const res = await getProductById(id);
        return res.data[0]
    } catch (err) {
        return rejectWithValue(err.message || "Data not fetched")
    }
})

// delete product
export const deleteProductData = createAsyncThunk('product/deleteProductById', async (id, { rejectWithValue }) => {
    try {
        const res = await deleteProductByID(id)
        return res
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

// add Product 

export const createProductData = createAsyncThunk('product/createProduct', async (data, { rejectWithValue }) => {
    try {
        const res = await createProduct(data);
        return res.data[0]
    } catch (err) {
        return rejectWithValue(err.message)
    }
})

export const updateProductData = createAsyncThunk('product/updateProduct', async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await updateProduct(id, data)
        return res.data[0]
    } catch (err) {
        return rejectWithValue(err.message)
    }
})


const getLocalCart = () => {
    try {
        const cart = localStorage.getItem('cart')
        return (JSON.parse(cart) || [])
    } catch (err) {
        return []
    }
}



const productSlice = createSlice({
    name: "products",
    initialState: {
        data: [],
        previewData: null,
        allProductsData :[],
        page: 1,
        loading: {
            dataLoading: false,
            previewDataLoading: false,
            deleteLoading: false,
            addLoading: false,
            updateLoading: false
        },
        filter: {
            productNameFilter: '',
            categoryFilter: 'All',
            priceFilter: 'asc'
        },
        cart: {
            show: false,
            cartData: getLocalCart()
        },
        error: null,
        hasMore: true
    },
    reducers: {
        handleCartAdd(state, action) {
            const isAlreadyIn = state.cart.cartData.find((item) => item.id === action.payload.id)
            if (isAlreadyIn) {
                isAlreadyIn.quantity = isAlreadyIn.quantity + 1
            } else {
                state.cart.cartData.push(action.payload)
                toast.success("Product added to cart!")
            }

        },
        handleCartMinus(state, action) {
            const isAlreadyIn = state.cart.cartData.find((item) => item.id === action.payload.id)
            if (isAlreadyIn) {
                isAlreadyIn.quantity = isAlreadyIn.quantity - 1
            }

        },
        handleCartDelete(state, action) {
            state.cart.cartData = state.cart.cartData.filter((item) => item.id !== action.payload)
            localStorage.setItem(
                'cart',
                JSON.stringify(state.cart.cartData)
            );
        },
        handleFilter(state, action) {
            const { name, value } = action.payload
            state.filter[name] = value
        },
        handleRemoveAllCart(state) {
            state.cart.cartData = []
            localStorage.setItem(
                'cart',
                JSON.stringify([])
            );
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getProductsData.pending, (state) => {
            state.loading.dataLoading = true
        }).addCase(getProductsData.fulfilled, (state, action) => {
            const { data, page, total, isPagination } = action.payload
            if (isPagination) {
                state.data = data
            } else if (page == 1) {
                state.data = data
            } else {
                const existingIds = new Set(
                    state.data.map((product) => product.id)
                );
                state.data.push(...data.filter((product) => !existingIds.has(product.id)))
            }
            state.page = page
            state.hasMore = isPagination ? false : state.data.length < total;
            state.loading.dataLoading = false
            state.total = total
        }

        ).addCase(getProductsData.rejected, (state, action) => {
            state.loading.dataLoading = false
            state.error = action.payload
        })
            .addCase(getProductByIdData.pending, (state) => {
                state.loading.previewDataLoading = true
            })
            .addCase(getProductByIdData.fulfilled, (state, action) => {
                state.loading.previewDataLoading = false
                state.previewData = action.payload
            })
            .addCase(getProductByIdData.rejected, (state, action) => {
                state.loading.previewDataLoading = false
                state.error = action.payload
            })
            .addCase(createProductData.pending, (state) => {
                state.loading.addLoading = true
            })
            .addCase(createProductData.fulfilled, (state, action) => {
                state.loading.addLoading = false
                state.data.unshift(action.payload)
            })
            .addCase(createProductData.rejected, (state, action) => {
                state.loading.addLoading = false
                action.error = action.payload
            })
            .addCase(updateProductData.pending, (state) => {
                state.loading.updateLoading = true
            })
            .addCase(updateProductData.fulfilled, (state, action) => {
                state.loading.updateLoading = false
                state.data = state.data.map((item) => item.id === action.payload.id ? action.payload : item)
            })
            .addCase(updateProductData.rejected, (state, action) => {
                state.loading.updateLoading = false
                state.error = action.payload
            })
            .addCase(getAllProductsData.pending,(state)=>{
               state.loading.dataLoading = true
            })
            .addCase(getAllProductsData.fulfilled,(state,action)=>{
               state.loading.dataLoading = false
                state.allProductsData = action.payload
            })
            .addCase(getAllProductsData.rejected,(state,action)=>{
               state.loading.dataLoading = true
               state.error = action.payload
            })
    }
})

export const { handleCartAdd, handleCartDelete, handleCartMinus, handleFilter, handleRemoveAllCart } = productSlice.actions

export default productSlice.reducer