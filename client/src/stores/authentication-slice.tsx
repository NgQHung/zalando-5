import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  loginFail: string;
  signupFail: string;
}

const initialState: InitialState = {
  loginFail: "",
  signupFail: "",
};

const authenticationSlice = createSlice({
  name: "mobile",
  initialState: initialState,
  reducers: {
    loginFail(state, action) {
      state.loginFail = action.payload;
    },
    signupFail(state, action) {
      state.signupFail = action.payload;
    },
  },
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
