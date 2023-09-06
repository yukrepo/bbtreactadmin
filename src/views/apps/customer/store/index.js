// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCustomers } from '../../../../utility/api'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appCustomer/getData', async params => {
  const response = await getCustomers(params)
  return {
    params,
    data: response.data.customers,
    allData: response.data.allData,
    totalPages: response.data.totalPages
  }
})


export const appCustomerSlice = createSlice({
  name: 'appCustomer',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
      state.params = action.payload.params
    })
  }
})

export default appCustomerSlice.reducer
