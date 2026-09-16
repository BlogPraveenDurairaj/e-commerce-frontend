import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWishlist, postWishlist, deleteWishlist, fetchAllWishList } from "../api/wishlistApi";
export const addWishListItem = createAsyncThunk('wishlist/addWishlist', async ({ userId, productId }, { rejectWithValue, getState }) => {
    try {
        const { session } = getState().auth
        const res = await postWishlist(userId, productId, session.access_token)
        return res.data[0]
    } catch (err) {
        return rejectWithValue(err.message || 'wishlist not added')
    }
})

export const getWishlistData = createAsyncThunk('wishlist/getWishlist', async (userId, { rejectWithValue, getState }) => {
    try {
        const { session } = getState().auth;
        const res = await fetchWishlist(userId, session.access_token)
        return res.data
    } catch (err) {
        return rejectWithValue(err.message || "fetching failed")
    }
})

export const deleteWishlistItem = createAsyncThunk('wishlist/deleteWishlist', async (wishlistId, { rejectWithValue, getState }) => {
    try {
        const { session } = getState().auth
        const res = await deleteWishlist(wishlistId, session.access_token)
        return wishlistId
    } catch (err) {
        rejectWithValue(err.message || 'Deleting failed')
    }
})

export const fetchAllWishListData = createAsyncThunk('wishlist/fetchAllWishlist', async (wishlistIds, { rejectWithValue }) => {
    try {
        const res = await fetchAllWishList(wishlistIds)
        return res.data
    } catch (err) {
        return rejectWithValue(err.message || "fetch failed")
    }
})
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        data: [],
        wishlistProductData: [],
        loading: null,
        error: null
    },
    reducers: {
        deleteProductWishlistItem(state, action) {
            state.wishlistProductData = state.wishlistProductData.filter((item) => item.id != action.payload)
        },
        clearWishListProductData(state){
            state.wishlistProductData = [] 
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addWishListItem.fulfilled, (state, action) => {
            state.data.push(action.payload)
        })
            .addCase(addWishListItem.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(getWishlistData.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(getWishlistData.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(deleteWishlistItem.fulfilled, (state, action) => {
                state.data = state.data.filter((item) => item.id != action.payload)
            })
            .addCase(deleteWishlistItem.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(fetchAllWishListData.fulfilled, (state, action) => {
                state.wishlistProductData = action.payload
            })
            .addCase(fetchAllWishListData.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const { deleteProductWishlistItem,clearWishListProductData } = wishlistSlice.actions
export default wishlistSlice.reducer