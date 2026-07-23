import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, MenuItem } from "../../types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<MenuItem>) {
      const existing = state.items.find(
        (cartItem) => cartItem.item._id === action.payload._id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ item: action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const index = state.items.findIndex(
        (cartItem) => cartItem.item._id === action.payload
      );
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
