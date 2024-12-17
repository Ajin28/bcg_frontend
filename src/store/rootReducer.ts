import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '../features/auth/authSlice'
import productSlice from '../features/product/productSlice'

const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice
});

export default rootReducer;
