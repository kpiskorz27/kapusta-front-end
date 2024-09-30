import { combineReducers } from 'redux';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Dodaj inne reducery tutaj
});

export default rootReducer;
