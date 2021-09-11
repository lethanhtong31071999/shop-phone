import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // id === product.id
  isShowMiniCart: false,
  totalProducts: 0,
  cartItems: [
    {
      id: null,
      product: {},
      quantity: null,
    },
  ],
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
        });
      }
    },

    removeProductFormCart(state, action) {
      const id = Number.parseInt(action.payload) || null;
      state.cartItems.filter((product) => product.id !== id);
    },

    setQuantityForProduct(state, action) {
      const { id, quantity } = action.payload;
      const productIndex = state.cartItems.findIndex(
        (product) => product.id === id
      );
      if (productIndex >= 0) {
        state.cartItems[productIndex].product.quantity = quantity;
      }
    },

    setShowMiniCart(state) {
      state.isShowMiniCart = true;
    },

    setHideMiniCart(state) {
      state.isShowMiniCart = false;
    },

    setTotalProduct(state) {
      const products = state.cartItems;
      const total = products.reduce((result, current) => {
        return result + current.quantity;
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
  setTotalProduct,
} = actions;
export default reducer;
