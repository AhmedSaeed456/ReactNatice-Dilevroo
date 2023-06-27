import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `can't remove product (id:${action.payload.id}, as it's bot found in basket!`
        );
      }
      state.items = newBasket;
    },
    resetBasket: (state) => {
      state.items.splice(0, state.items.length);
    },
  },
});
// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, resetBasket } =
  basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemById = (state, id) =>
  state.basket.items.filter((item) => id === item.id);

export const selectTotalPrice = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
