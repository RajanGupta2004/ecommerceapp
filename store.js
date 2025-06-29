import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/cartReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
