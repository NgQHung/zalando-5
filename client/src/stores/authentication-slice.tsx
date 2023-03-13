import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  loginFail: string;
}

const initialState: InitialState = {
  loginFail: "",
};

const authenticationSlice = createSlice({
  name: "mobile",
  initialState: initialState,
  reducers: {
    loginFail(state, action) {
      state.loginFail = action.payload;
    },
  },
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
