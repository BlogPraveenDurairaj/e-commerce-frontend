import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../slice/productSlice';
import authSlice from '../slice/authSlice';
import wishlistSlice from '../slice/wishlistSlice';
import orderSlice from '../slice/orderSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productSlice,
        wishlist:wishlistSlice,
        orders:orderSlice
    }
})