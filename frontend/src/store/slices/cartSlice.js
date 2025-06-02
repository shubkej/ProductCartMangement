import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart', async () => {
    const res = await axios.get('http://localhost:3500/api/cart/getCart');
    debugger
    return res.data;
});

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ productId, quantity }) => {
        const res = await axios.put(`http://localhost:3500/api/cart/${productId}`, { quantity });
        return res.data;
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity = 1 }) => {
        const res = await axios.post('http://localhost:3500/api/cart/addToCart', {
            productId,
            quantity,
        });
        return res.data;
    }
);

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (productId) => {
    const res = await axios.delete(`http://localhost:3500/api/cart/${productId}`);
    return res.data;
});


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                debugger
                state.items = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                debugger
                state.items = action.payload;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.items = action.payload;
            });
    },
});

export const cartTotalItems = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
