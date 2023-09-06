// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getEstimates } from '../../../../utility/api'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appEstimate/getData', async params => {
  const response = await getEstimates(params)
  return {
    params,
    data: response.data.estimates,
    allData: response.data.allData,
    totalPages: response.data.total
  }
})

export const deleteEstimate = createAsyncThunk('appEstimate/deleteEstimate', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/estimate/delete', { id })
  await dispatch(getData(getState().estimate.params))
  return id
})

export const appEstimateSlice = createSlice({
  name: 'appEstimate',
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

export default appEstimateSlice.reducer
