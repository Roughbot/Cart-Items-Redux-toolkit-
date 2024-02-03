import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: cartItems.length,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== id;
      });
      state.amount = state.cartItems.length;
    },
    increaseCount: (state, action) => {
      const id = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === id);
      cartItem.amount += 1;
    },
    decreaseCount: (state, action) => {
      const id = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (cartItem.amount > 1) {
        cartItem.amount -= 1;
      } else {
        state.cartItems = state.cartItems.filter((item) => {
          return item.id !== id;
        });
      }
    },
  },
});

export const { clearCart, removeItem, increaseCount, decreaseCount } =
  cartSlice.actions;
export default cartSlice.reducer;
