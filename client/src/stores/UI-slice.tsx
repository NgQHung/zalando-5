import { createSlice, Dispatch } from "@reduxjs/toolkit";

interface InitialState {
  bg_color_shopping_cart: boolean;
  bg_color_header: boolean;
  loading__add: boolean;
  loading__total: boolean;
  dropdown_shoppingCart: boolean;
  dropdown_onHover_shoppingCart: boolean;
  amountRemoved: boolean;
  disabled: boolean;
  loading_page: boolean;
  nextInput: string;
  animationLoginSignup: string;
  animationLoginSignupFirstTime: boolean;
  goToCheckout: boolean;
  selectedTypeDelivery: string;
  openAddressForm: boolean;
}

const initialState: InitialState = {
  bg_color_shopping_cart: false,
  bg_color_header: false,
  loading__add: false,
  loading__total: false,
  dropdown_shoppingCart: false,
  dropdown_onHover_shoppingCart: false,
  amountRemoved: false,
  disabled: false,
  loading_page: false,
  nextInput: "",
  animationLoginSignup: "",
  animationLoginSignupFirstTime: false,
  goToCheckout: false,
  selectedTypeDelivery: "",
  openAddressForm: false,
};

const UISLice = createSlice({
  name: "UI",
  initialState: initialState,
  reducers: {
    backgroundColor__shoppingCart(state, action) {
      state.bg_color_shopping_cart = action.payload;
    },
    backgroundColor__header(state, action) {
      state.bg_color_header = action.payload;
    },
    loading__total(state, action) {
      const { loading__total } = action.payload;
      state.loading__total = loading__total;
    },
    loading__add(state, action) {
      const { loading__add } = action.payload;
      state.loading__add = loading__add;
    },
    dropdown_shoppingCart(state, action) {
      state.dropdown_shoppingCart = action.payload;
    },
    dropdown_onHover(state, action) {
      state.dropdown_onHover_shoppingCart = action.payload;
    },
    amountRemoved(state, action) {
      state.amountRemoved = action.payload;
    },
    disabledButton(state, action) {
      state.disabled = action.payload;
    },
    loadingPage(state, action) {
      state.loading_page = action.payload;
    },
    inputTabKey(state, action) {
      state.nextInput = action.payload;
      // console.log(state.nextInput);
    },
    animationLoginSignup(state, action) {
      state.animationLoginSignup = action.payload;
    },
    animationLoginSignupFirstTime(state, action) {
      state.animationLoginSignupFirstTime = action.payload;
    },
    goToCheckout(state, action) {
      state.goToCheckout = action.payload;
    },
    selectedTypeDelivery(state, action) {
      state.selectedTypeDelivery = action.payload;
    },
    openAddressForm(state, action) {
      state.openAddressForm = action.payload;
    },
  },
});

export const amountRemovedHandler = (dispatch: Dispatch, timeout: number) => {
  dispatch(UIActions.amountRemoved(true));
  setTimeout(() => {
    dispatch(UIActions.amountRemoved(false));
  }, timeout);
};
export const disabledHandlerHandler = (dispatch: Dispatch, timeout: number) => {
  let timeoutVar;
  dispatch(UIActions.disabledButton(true));
  clearTimeout(timeoutVar);
  timeoutVar = setTimeout(() => {
    dispatch(UIActions.disabledButton(false));
  }, timeout);
};

export const UIActions = UISLice.actions;

export default UISLice.reducer;
