import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../stores";

export const addedShoppingCart = createSelector(
  (state: RootState) => state.cartSlice.addedShoppingCart,
  (rawValue: any) => rawValue.map((entry: any) => entry.data)
);
export const addedFavorite = createSelector(
  (state: RootState) => state.cartSlice.addedFavorite,
  (rawValue: any) => rawValue.map((entry: any) => entry.data)
);
