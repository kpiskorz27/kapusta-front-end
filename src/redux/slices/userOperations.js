import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/user");
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch user data"
      );
    }
  }
);

const userOperations = {
  getUser,
};

export default userOperations;
