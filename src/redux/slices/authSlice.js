import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./authOperations";

const initialState = {
  userData: null,
  accessToken: null,
  refreshToken: null,
  sid: null,
  isLoggedIn: false,
  isRefreshingUser: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authOperations.register.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(authOperations.logIn.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(authOperations.logOut.fulfilled, (state) => {
        state.userData = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.sid = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(authOperations.logIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(authOperations.register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(authOperations.logOut.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
