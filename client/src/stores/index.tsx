import { configureStore, applyMiddleware, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productSlice from "./product-slice";
import UISlice from "./UI-slice";
import userSlice from "./user-slice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mobileSlice from "./mobile-slice";
import cartSlice from "./cart-slice";
import checkoutSlice from "./checkout-slice";
import authenticationSlice from "./authentication-slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // preventing slices from persisting
  blacklist: [
    "productSlice",
    "UISlice",
    "userSlice",
    "mobileSlice",
    "checkoutSlice",
    "authenticationSlice",
    // "cartSlice",
  ],
};

const rootReducer = combineReducers({
  productSlice: productSlice,
  UISlice: UISlice,
  cartSlice: cartSlice,
  userSlice: userSlice,
  mobileSlice: mobileSlice,
  checkoutSlice: checkoutSlice,
  authenticationSlice: authenticationSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// const persistedState = loadState();

// const store = configureStore({
//   reducer: {
//     productSlice: productSlice,
//     UISlice: UISlice,
//     cartSlice: cartSlice,
//     userSlice: userSlice,
//     mobileSlice: mobileSlice,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
//   preloadedState: persistedState,
// });

// store.subscribe(
//   () =>
//     // throttle(() => {
//     saveState(store.getState().cartSlice)
//   // }, 1000)
// );
applyMiddleware(thunk);

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// export declare const useDispatch: <
//     AppDispatch extends Dispatch<AnyAction> = Dispatch<AnyAction>
// >() => AppDispatch;

export default store;
