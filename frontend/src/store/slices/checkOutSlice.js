import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitCheckout = createAsyncThunk('checkout/submit', async (payload) => {
    const res = await axios.post('http://localhost:3500/api/checkout/checkOutOrder', payload);
    return res.data;
});

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        formData: {
            firstName: '',
            lastName: '',
            address: ''
        },
        status: 'idle',
    },
    reducers: {
        updateFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitCheckout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitCheckout.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(submitCheckout.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { updateFormData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
