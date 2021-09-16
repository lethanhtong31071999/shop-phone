import { createSlice } from "@reduxjs/toolkit";
import { current } from "../../../node_modules/@reduxjs/toolkit/dist/index";

const initialState = {
  // id === product.id
  isShowMiniCart: false,
  totalProducts: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, product, quantity } = action.payload;

      // Check existing product if true
      const existingIndex = state.cartItems.findIndex((item) => item.id === id);
      if (existingIndex >= 0) {
        // Update quantity
        state.cartItems[existingIndex].quantity += quantity;
      } else {
        //   Add new items into cart
        state.cartItems.push({
          id,
          product,
          quantity,
          checked: true,
        });
      }
    },

    removeProductFormCart(state, action) {
      const id = action.payload || null;
      state.cartItems = state.cartItems.filter((product) => product.id !== id);
    },

    setQuantityForProduct(state, action) {
      const productIndex = state.cartItems.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndex >= 0) {
        state.cartItems[productIndex].quantity = Number.parseInt(
          action.payload.quantity
        );
      }
    },

    setSelectedProduct(state, action) {
      const { id, value } = action.payload;
      const index = state.cartItems.findIndex((product) => product.id === id);
      if (index >= 0) {
        state.cartItems[index].checked = value;
      }
    },

    setShowMiniCart(state) {
      state.isShowMiniCart = true;
    },

    setHideMiniCart(state) {
      state.isShowMiniCart = false;
    },

    setTotalProduct(state) {
      const total = state.cartItems.reduce((result, current) => {
        return result + Number.isInteger(current.quantity);
      }, 0);
      state.totalProducts = total;
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  addToCart,
  setQuantityForProduct,
  removeProductFormCart,
  setHideMiniCart,
  setShowMiniCart,
  setSelectedProduct,
} = actions;
export default reducer;
