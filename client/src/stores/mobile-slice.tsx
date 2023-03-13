import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  navbarActive: boolean;
}

const initialState: InitialState = {
  navbarActive: false,
};

const mobileSlice = createSlice({
  name: "mobile",
  initialState: initialState,
  reducers: {
    mobile_navbar(state, action) {
      state.navbarActive = action.payload;

      // console.log(state.navbarActive);
    },
  },
});

export const mobileActions = mobileSlice.actions;

export default mobileSlice.reducer;
