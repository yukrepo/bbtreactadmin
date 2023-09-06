// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchPaymentTerms } from '../../../../../utility/api';

export const getPaymentTerms = createAsyncThunk('appPaymentTerms/getPaymentTerms', async () => {
  const response = await fetchPaymentTerms();
  return response.data;
});

export const appPaymentTermsSlice = createSlice({
  name: 'appPaymentTerms',
  initialState: {
    paymentTerms: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPaymentTerms.fulfilled, (state, action) => {
      state.paymentTerms = action.payload;
    });
  },
});

export default appPaymentTermsSlice.reducer;
