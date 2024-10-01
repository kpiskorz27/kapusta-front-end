import axiosInstance from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const token = {
  set(token) {
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common.Authorization;
  },
};

const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/register", credentials);
      const response = await axiosInstance.post("/auth/login", credentials);
      const { accessToken, refreshToken, sid, userData } = response.data.data;
      token.set(accessToken);
      return { accessToken, refreshToken, sid, userData };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      const { accessToken, refreshToken, sid, userData } = response.data.data;
      token.set(accessToken);
      return { accessToken, refreshToken, sid, userData };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
      token.unset();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const refreshToken = state.auth.refreshToken;
    const sid = state.auth.sid;
    if (!refreshToken || !sid) {
      return rejectWithValue("No refresh token available");
    }
    try {
      const response = await axiosInstance.post("/auth/refresh", {
        sid,
        refreshToken,
      });
      const { newAccessToken, newRefreshToken } = response.data.data;
      token.set(newAccessToken);
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Session refresh failed"
      );
    }
  }
);

const authOperations = {
  register,
  logIn,
  logOut,
  refreshUser,
};

export default authOperations;
