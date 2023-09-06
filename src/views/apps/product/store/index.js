import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, addProduct } from '../../../../utility/api'; // Import your API functions

export const getData = createAsyncThunk('appProduct/getData', async (params) => {
  const response = await fetchProducts(params);
  return {
    params,
    data: response.data.products,
    allData: response.data.allData,
    totalPages: response.data.total,
  };
});

export const addNewProduct = createAsyncThunk('appProduct/addNewProduct', async (newProduct) => {
  const response = await addProduct(newProduct);
  return response.data; // Assuming your API response contains the newly added product
});

export const searchProductData = createAsyncThunk('appProduct/searchProductData', async (searchQuery) => {
  const queryString = `?query=${encodeURIComponent(searchQuery)}`;
  const response = await searchProducts(queryString);
  return {
    searchResults: response.data.products,
  };
});

const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  searchResults: [], // Initialize the searchResults field
};

const appProductSlice = createSlice({
  name: 'appProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.allData = action.payload.allData;
        state.total = action.payload.totalPages;
        state.params = action.payload.params;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        // After successfully adding a new product, you can trigger a refresh
        // by calling the getData action with the existing params
        getData.fulfilled(state, { payload: { params: state.params } });
      })
      .addCase(searchProductData.fulfilled, (state, action) => {
        state.searchResults = action.payload.data; // Update the searchResults field
        state.total = 10; // Update the total field for pagination
      });
  },
});

export default appProductSlice.reducer;
