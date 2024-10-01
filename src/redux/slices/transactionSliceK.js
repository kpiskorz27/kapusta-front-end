import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportAPI from "../../api/reportApi";
import authOperations from "./authOperations";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (monthYear, { rejectWithValue, dispatch }) => {
    try {
      const response = await reportAPI.getTransactionsForMonth(monthYear);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          await dispatch(authOperations.refreshUser());

          const retryResponse = await reportAPI.getTransactionsForMonth(
            monthYear
          );
          return retryResponse.data.data;
        } catch (refreshError) {
          return rejectWithValue("Session expired. Please log in again.");
        }
      }

      return rejectWithValue(
        error.response?.data || "An error occurred while fetching transactions."
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    income: { total: 0, categories: [] },
    expenses: { total: 0, categories: [] },
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
        state.income = action.payload.incomes;
        state.expenses = action.payload.expenses;
        state.categories = action.payload.categories;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
