// src/redux/slices/transactionSliceK.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportAPI from "../../api/reportApi";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (monthYear, { rejectWithValue }) => {
    try {
      const response = await reportAPI.getTransactionsForMonth(monthYear);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch transactions"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    income: { total: 0, categories: [] },
    expenses: [],
    monthStats: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses || [];
        state.monthStats = action.payload.monthStats || {};
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
