// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appProduct/getData', async params => {
  const response = await axios.get('/apps/product/products', params)
  return {
    params,
    data: response.data.products,
    allData: response.data.allData,
    totalPages: response.data.total
  }
})

// export const deleteInvoice = createAsyncThunk('appInvoice/deleteInvoice', async (id, { dispatch, getState }) => {
//   await axios.delete('/apps/invoice/delete', { id })
//   await dispatch(getData(getState().invoice.params))
//   return id
// })

export const appProductSlice = createSlice({
  name: 'appProduct',
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

export default appProductSlice.reducer
