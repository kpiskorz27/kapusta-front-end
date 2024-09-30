import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL =
  process.env.REACT_APP_API_BASE_URL ||
  'https://goit-fs17-react-node-final-git-d13a3e-piotrs-projects-71925c68.vercel.app';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    delete axios.defaults.headers.common.Authorization;
  },
};

const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      await axios.post('/auth/register', credentials);
      const response = await axios.post('/auth/login', credentials);
      const { accessToken, refreshToken, sid, userData } = response.data.data;
      token.set(accessToken);
      return { accessToken, refreshToken, sid, userData };
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || 'Registration failed'
      );
    }
  }
);

const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { accessToken, refreshToken, sid, userData } = response.data.data;
      token.set(accessToken);
      return { accessToken, refreshToken, sid, userData };
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Login failed');
    }
  }
);

const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      await axios.post('/auth/logout');
      token.unset();
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Logout failed');
    }
  }
);

const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const refreshToken = state.auth.refreshToken;
    const sid = state.auth.sid;

    if (!refreshToken || !sid) {
      return rejectWithValue('No refresh token available');
    }

    token.set(refreshToken);
    try {
      const response = await axios.post('/auth/refresh', { sid });
      const { newAccessToken, newRefreshToken } = response.data.data;
      token.set(newAccessToken);
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || 'Session refresh failed'
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
