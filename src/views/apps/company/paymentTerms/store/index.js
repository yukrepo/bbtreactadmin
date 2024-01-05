// // ** Redux Imports
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { fetchPaymentTerms } from '../../../../../utility/api'

// // ** Axios Imports
// import axios from 'axios'

// export const getData = createAsyncThunk('appPaymentTerms/getData', async () => {
//   const response = await fetchPaymentTerms()
//   return {
//     data: response.data,
//   }
// })


// export const appPaymentTermsSlice = createSlice({
//   name: 'appPaymentTerms',
//   initialState: {
//     data: []
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder.addCase(getData.fulfilled, (state, action) => {
//       state.data = action.payload.data
//     })
//   }
// })

// export default appPaymentTermsSlice.reducer
