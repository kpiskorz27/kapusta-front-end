import { combineReducers } from "@reduxjs/toolkit";
import balanceReducer from "./slices/balanceSliceM";
import transactionsReducer from "./slices/transactionSliceM";
import userReducer from "./slices/userSliceM";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  balance: balanceReducer,
  transactions: transactionsReducer,
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
