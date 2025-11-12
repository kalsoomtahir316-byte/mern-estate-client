import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import listingsReducer from "../features/listings/listingsSlice";

 export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer, // <<-- KEY must be 'listings'
  },
});

