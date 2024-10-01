import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const addIncome = createAsyncThunk(
  "transactions/addIncome",
  async (value, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/income", value);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getIncome = createAsyncThunk(
  "transactions/getIncome",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/income");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addExpense = createAsyncThunk(
  "transactions/addExpense",
  async (expense, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/expenses", expense);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateBalance = createAsyncThunk(
  "transactions/updateBalance",
  async (value, thunkAPI) => {
    try {
      const { data } = await axios.patch("/api/balance", { balance: value });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getAllTransactions = createAsyncThunk(
  "transactions/getAllTransactions",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/transactions");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, thunkAPI) => {
    try {
      const { data: newBalance } = await axios.delete(`/api/expenses/${id}`);
      return { newBalance, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getExpenses = createAsyncThunk(
  "auth/getExpenses",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/expenses");
      console.log("Expenses fetched from API: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching expenses: ", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
