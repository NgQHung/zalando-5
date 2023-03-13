import { createSlice } from "@reduxjs/toolkit";
import { ProductDetail } from "../interfaces/ProductDetail";
import { Products } from "../interfaces/Products";

interface InitialState {
  allProducts: Products[]; // all products
  products_1: Products[]; // products to show 2
  products_2: Products[]; // products to show 2
  selectedProduct: ProductDetail; // detail selected product
  selectedId: number | null;
  removedProduct: Products[];
  nameProduct: string;
  favoriteProductFromDB: ProductDetail[];
}

const initialState: InitialState = {
  allProducts: [],
  products_1: [],
  products_2: [],
  selectedProduct: {},
  selectedId: null,
  removedProduct: [],
  nameProduct: "",
  favoriteProductFromDB: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    productsHandler(state, action) {
      state.allProducts = action.payload.allProducts;
      // console.log(state.allProducts);
      state.products_1 = action.payload.products_1;
      // console.log("store: ", state.products_1[0], state.products_1[1], state.products_1[2]);
      state.products_2 = action.payload.products_2;
    },
    selectedProductHandler(state, action) {
      state.selectedProduct = action.payload;
    },
    selectedIdHandler(state, action) {
      state.selectedId = action.payload;
      localStorage.setItem("selectedId", JSON.stringify(action.payload));
    },
    removedProductHandler(state, action) {
      // const { removedFavorite, restore } = action.payload;
      // state.removedProduct = [...removedFavorite];
      // if (restore) {
      //   return;
      // }
      // setTimeout(() => {
      //   state.removedProduct.pop();
      // }, 3000);
      // console.log(state.removedProduct);
    },
    favoriteProductFromDB(state, action) {
      state.favoriteProductFromDB.push(action.payload);
    },
    nameProductHandler(state, action) {
      state.nameProduct = action.payload;
    },
  },
});

// export const hardDeleteProduct = (
//   dispatch: Dispatch,
//   removedFavorite: productShoppingCart | undefined,
//   isRestore: boolean
// ) => {
//   dispatch(productActions.removedProductHandler(removedFavorite));
//   if (isRestore) {
//     return;
//   } else {
//     setTimeout(() => {
//       dispatch(productActions.removedProductHandler(null));
//     }, 3000);
//   }
// };

export const productActions = productSlice.actions;

export default productSlice.reducer;
