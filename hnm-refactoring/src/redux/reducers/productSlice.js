import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
  productList: [],
  productItem: null,
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchAll",
  async (searchQuery, thunkAPI) => {
    try {
      let url = `https://my-json-server.typicode.com/hellojoyworldz/lego-project/products?q=${searchQuery}`;
      let response = await fetch(url);
      return await response.json();
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  "product/fetchDetail",
  async (id, thunkAPI) => {
    try {
      let url = `https://my-json-server.typicode.com/hellojoyworldz/lego-project/products/${id}`;
      let response = await fetch(url);
      return await response.json();
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  // 동기적으로 자신의 state를 바꾸는 경우
  reducers: {},
  // 외부라이브러리로 부터 state가 바뀌는 경우 (비동기 케이스 주로 처리)
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productItem = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
