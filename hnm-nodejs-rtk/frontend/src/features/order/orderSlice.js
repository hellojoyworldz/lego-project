import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartQty } from "../cart/cartSlice";
import api from "../../utils/api";
import { showToastMessage } from "../common/uiSlice";

// Define initial state
const initialState = {
  orderList: [],
  orderNum: "",
  selectedOrder: {},
  error: "",
  loading: false,
  totalPageNum: 1,
};

// Async thunks
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/order", payload);

      if (response.status !== 200) {
        throw new Error(response.error);
      }

      dispatch(
        showToastMessage({
          message: "주문이 완료되었습니다.",
          status: "success",
        })
      );
      dispatch(getCartQty());

      return response.data.orderNum;
    } catch (error) {
      error.error.map((item) =>
        dispatch(
          showToastMessage({
            message: item.message,
            status: "error",
          })
        )
      );

      return rejectWithValue(error.error);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/order/me");

      if (response.status !== 200) {
        throw new Error(response.error);
      }

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderList = createAsyncThunk(
  "order/getOrderList",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get("/order", { params: { ...query } });

      if (response.status !== 200) {
        throw new Error(response.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, status }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/order/${id}`, { status });

      if (response.status !== 200) {
        throw new Error(response.error);
      }

      dispatch(getOrderList({ page: 1 }));

      dispatch(
        showToastMessage({
          message: "주문 상태가 변경되었습니다.",
          status: "success",
        })
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Order slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.orderNum = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.createOrderError = action.payload;
      });

    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        state.orderList = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getOrderList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload.data;
        state.totalPageNum = action.payload.totalPageNum;
        state.error = "";
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedOrder, clearError } = orderSlice.actions;
export default orderSlice.reducer;
