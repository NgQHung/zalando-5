import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: {
    accessToken: string;
    admin: string;
    email: string;
    firstName: string;
    _id: string;
  } | null;
}

const initialState: InitialState = {
  user: null,
};

const userSLice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginHandler(state, action) {
      state.user = action.payload;
    },
    logoutHandler(state) {
      state.user = null;
    },
  },
});

export const userActions = userSLice.actions;

export default userSLice.reducer;
