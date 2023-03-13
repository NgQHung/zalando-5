import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Products } from "../interfaces/Products";
import { ShoppingProducts } from "../interfaces/ShoppingProducts";

export interface UserShoppingCart {
  data: {
    id: number;
    brand: string;
    name: string;
    imageUrl: string;
    currentPrice: number;
    previousPrice?: number;
    amount: number;
    size: string;
    totalProduct: number;
  }[];
}
export interface ILikedProductsId {
  id: number;
  // _id: any;
}

interface InitialState {
  addedShoppingCart: ShoppingProducts[];
  userAddedShoppingCart: UserShoppingCart[];
  likedProductsId: ILikedProductsId[];
  addedFavorite: Products[];
  initialAmount: number;
  totalProduct: number;
  total: number;
  removedProductNotification: boolean;
}

const initialState: InitialState = {
  addedShoppingCart: [],
  userAddedShoppingCart: [],
  likedProductsId: [],
  addedFavorite: [],
  initialAmount: 0,
  totalProduct: 0,
  total: 0,
  removedProductNotification: false,
};

// const MyContext = createContext(initialState);

const cartSlice = createSlice({
  name: "Shopping cart",
  initialState: initialState,
  reducers: {
    getShoppingCart(state, action) {
      state.addedShoppingCart = action.payload;
    },
    getLikedProduct(state, action) {
      state.likedProductsId = action.payload;
      // console.log("get liked product from db: ", action.payload);
      // state.addedFavorite = action.payload;
      // state.likedProductsId = action.payload;
    },
    addShoppingCartHandler(state, action) {
      const idProduct = action.payload.id;
      const sizeProduct = action.payload.size;
      // console.log(state.addedShoppingCart);
      const existingProductWithSizeIndex = state.addedShoppingCart.findIndex((product) => {
        return product.id === idProduct && product.size === sizeProduct;
      });
      const existingProductWithSize = state.addedShoppingCart[existingProductWithSizeIndex];

      let updateProduct;
      if (existingProductWithSize) {
        const updatedProduct = {
          ...existingProductWithSize,
          amount: existingProductWithSize.amount + action.payload.amount,
          totalProduct: existingProductWithSize.totalProduct! + existingProductWithSize.currentPrice,
        };
        updateProduct = [...state.addedShoppingCart];
        updateProduct[existingProductWithSizeIndex] = updatedProduct;
        state.addedShoppingCart = updateProduct;
      } else {
        state.addedShoppingCart.push(action.payload);
      }
      toast.success("Your product is added successfully");
    },
    removeShoppingCartHandler(state, action) {
      const idProduct = action.payload.id;
      const sizeProduct = action.payload.size;
      const existingProductWithSizeIndex = state.addedShoppingCart.findIndex((product) => {
        return product.id === idProduct && product.size === sizeProduct;
      });
      const existingProductWithSize: ShoppingProducts = state.addedShoppingCart[existingProductWithSizeIndex];

      let updateProduct;

      if (existingProductWithSize?.amount === 1) {
        state.removedProductNotification = true;
        updateProduct = state.addedShoppingCart.filter((product) => {
          return product.id !== idProduct || product.size !== sizeProduct;
        });
        // console.log("render");
        state.addedShoppingCart = updateProduct;
      } else {
        const updatedProduct: ShoppingProducts = {
          ...existingProductWithSize,
          amount: existingProductWithSize.amount! - 1,
          totalProduct: existingProductWithSize.totalProduct! - existingProductWithSize.currentPrice,
        };

        updateProduct = [...state.addedShoppingCart];
        updateProduct[existingProductWithSizeIndex] = updatedProduct;
        state.addedShoppingCart = updateProduct;
      }
    },
    calculateTotals(state) {
      let total = 0;
      if (state.addedShoppingCart) {
        state.addedShoppingCart.forEach((item: ShoppingProducts) => {
          total += item.amount! * item.currentPrice;
        });
      }

      state.total = total;
    },
    notificationRemovedProduct(state, action) {
      state.removedProductNotification = action.payload;
    },
    addFavoriteHandler(state, action) {
      const idProduct = action.payload?.id;
      const existingProductIndex = state.addedFavorite.findIndex((product: Products) => product?.id === idProduct);
      const existingProduct = state.addedFavorite[existingProductIndex];
      if (existingProduct) {
        return;
      } else {
        state.addedFavorite = [...state.addedFavorite, action.payload];
        // state.likedProductsId = [...state.likedProductsId, { id: idProduct }];
        // state.likedProductsId = [];
      }
      toast.success("Your product is added successfully");
    },
    removeFavorite(state, action) {
      const idProduct = action?.payload?.id;
      let updateAddedFavorite;
      // let updateLikedProductsId;
      const existingProductIndex = state.addedFavorite.findIndex((item) => item?.id === idProduct);
      const existingProduct = state.addedFavorite[existingProductIndex];
      if (existingProduct) {
        // detail of liked products
        const newUpdateAddedFavorite = [...state.addedFavorite];
        updateAddedFavorite = newUpdateAddedFavorite.filter((item) => item?.id !== idProduct);
        state.addedFavorite = updateAddedFavorite;

        // ids of liked products
        // const newUpdateLikedProductsId = [...state.likedProductsId];
        // updateLikedProductsId = newUpdateLikedProductsId.filter((item) => item.id !== idProduct);
        // state.likedProductsId = updateLikedProductsId;
      } else return;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
