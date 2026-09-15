import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductById } from "../api/productApi";
import toast from "react-hot-toast";
export const getProductsData = createAsyncThunk('products/getProducts', async ({ page, category, sort, search }, { rejectWithValue }) => {

    try {
        const res = await getProducts(page, category, sort, search)
        return { data: res.data, page: page }
    } catch (err) {
        return rejectWithValue(err.message || "something went wrong")
    }
})

export const getProductByIdData = createAsyncThunk('product/getProductById', async (id, { rejectWithValue }) => {
    try {
        const res = await getProductById(id);
        console.log(res.data[0],'  params.append("select", "*");')
        return res.data[0]
    } catch (err) {
        return rejectWithValue(err.message || "Data not fetched")
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
        page: 1,
        loading: {
            dataLoading: false,
            previewDataLoading: false
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
            const { data, page } = action.payload
            if (page == 1) {
                state.data = data
            } else {
                state.data.push(...data)
            }
            state.page = page
            state.hasMore = data.length > 0
            state.loading.dataLoading = false


        }).addCase(getProductsData.rejected, (state, action) => {
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
    }
})

export const { handleCartAdd, handleCartDelete, handleCartMinus, handleFilter,handleRemoveAllCart } = productSlice.actions

export default productSlice.reducer