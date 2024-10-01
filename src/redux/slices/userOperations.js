import axios from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authSelectors from "./authSelectors";

const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = authSelectors.getAccessToken(state);

    console.log("Fetching user data with token:", token);

    try {
      const { data } = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User data received:", data);
      return data.data;
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

const userOperations = {
  getUser,
};

export default userOperations;
