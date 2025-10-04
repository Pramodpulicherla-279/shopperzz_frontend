import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import {productReducer, demandedProductReducer, cartProductReducer } from './slices/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    demandedProducts: demandedProductReducer,
    cartProducts: cartProductReducer,
    // ...add other reducers here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
