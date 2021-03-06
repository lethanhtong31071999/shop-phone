import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/Cart/cartSlice";

const rootReducer = {
  user: {},
  carts: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
