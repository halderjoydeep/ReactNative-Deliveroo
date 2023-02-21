import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        if (existingItem.quantity === 20) {
          return;
        }
        existingItem.quantity++;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromBasket: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (!existingItem) {
        return;
      }

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      } else if (existingItem.quantity > 1) {
        existingItem.quantity--;
      }
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const selectItems = (state) => state.basket.items;
export const selectItemsByRestaurant = (state, restaurant) =>
  state.basket.items.filter((item) => item.restaurant === restaurant);
export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
