import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import checkOutReducer from './slices/checkOutSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
        checkout: checkOutReducer
    },
});
