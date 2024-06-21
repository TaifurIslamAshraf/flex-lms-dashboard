import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cartItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartItems: (state, action: PayloadAction<{ cartItems: number }>) => {
      state.cartItems = action.payload.cartItems;
    },
  },
});

export const { updateCartItems } = cartSlice.actions;

export default cartSlice.reducer;
