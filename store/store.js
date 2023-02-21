import { configureStore } from '@reduxjs/toolkit';
import basketSliceReducer from './basketSlice';
import restaurantSliceReducer from './restaurantSlice';

export const store = configureStore({
  reducer: { basket: basketSliceReducer, restaurant: restaurantSliceReducer },
});
