import axios from "axios";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { AddressDelivery } from "../interfaces/addressDelivery";
import { Products } from "../interfaces/Products";
import { IPurchasedProducts } from "../interfaces/purchasedProducts";
import { ShoppingProducts } from "../interfaces/ShoppingProducts";
import { cartActions, ILikedProductsId } from "../stores/cart-slice";
import { checkoutActions } from "../stores/checkout-slice";
import { productActions } from "../stores/product-slice";
import { UIActions } from "../stores/UI-slice";
import { AfterRefresh } from "../utils/pageIsRefreshed";

export interface User {
  accessToken: string;
  admin: string;
  email: string;
  firstName: string;
  _id: string;
}

const uriBase = {
  // server: "http://localhost:8080",
  // server: "http://ec2-16-171-38-72.eu-north-1.compute.amazonaws.com:8080",
  server: "https://zalando-be.onrender.com",
};

// const uriBase = {
//   // server: "https://zalando-be.herokuapp.com",
//   server: "http://localhost:8080",
// };

// get all products
export const getProducts = async (
  dispatch: Dispatch,
  user: User,
  addedProductsFromBe: Products[],
  likedProductsFromDB: ILikedProductsId[]
) => {
  let response;
  try {
    dispatch(UIActions.loadingPage(true));
    setTimeout(async () => {
      response = await axios.get(`${uriBase.server}/products`);
      const all = await response.data;
      const newAllProduct = await all.map((item: Products) => {
        return { ...item, isFavorite: false };
      });
      let newAllProducts;
      const persist = (await JSON.parse(localStorage.getItem("persist:root")!)) || {};
      if (user) {
        //   // take data from BE
        let map: any;

        const newLikedProductsFromDB = likedProductsFromDB.map((item) => item.id);

        const updateProducts = newAllProduct.filter((item: Products) => newLikedProductsFromDB.includes(item.id));

        const updateProduct = updateProducts.map((ele: Products) => {
          dispatch(cartActions.addFavoriteHandler({ ...ele, isFavorite: true }));
          return { ...ele, isFavorite: true };
        });
        map = new Map(await updateProduct.map((o: ILikedProductsId) => [o?.id, o]));
        newAllProducts = [...newAllProduct].map((o) => Object.assign({}, o, map.get(o.id)));
      } else {
        const getCart = persist.cartSlice || [];
        const addedFavoriteProducts = (await JSON.parse(getCart).addedFavorite) || [];
        let map: any;
        map = new Map(await addedFavoriteProducts.map((o: Products) => [o?.id, o]));

        // update data from server with data from local storage
        newAllProducts = [...newAllProduct].map((o) => Object.assign({}, o, map.get(o.id)));
      }

      const allProducts = newAllProducts ? newAllProducts : newAllProduct;
      const products_1 = allProducts.slice(0, 14);
      // const products_2 = allProducts.slice(15, 30);

      dispatch(
        productActions.productsHandler({
          allProducts: allProducts,
          products_1: products_1,
          // products_2: products_2,
        })
      );
      dispatch(UIActions.loadingPage(false));
    }, 1000);
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

// get detail selected product
export const getDetailProduct = async (dispatch: Dispatch, id: number | null, user: User) => {
  let response;
  let getSelectedId: number;
  if (AfterRefresh()) {
    getSelectedId = JSON.parse(localStorage.getItem("selectedId")!) || [];
    if (getSelectedId) {
      dispatch(productActions.selectedIdHandler(getSelectedId));
    }
  }

  try {
    dispatch(UIActions.loadingPage(true));
    setTimeout(async () => {
      response = await axios.get(`${uriBase.server}/product/${id ? id : getSelectedId}`);
      const detailProduct = response.data;
      dispatch(productActions.selectedProductHandler(detailProduct));
      dispatch(UIActions.loadingPage(false));
    }, 1000);
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

export const postShoppingCartById = async (dispatch: Dispatch, user: any, data: Products[] | ShoppingProducts[]) => {
  console.count("post data to id of user");
  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });
  try {
    await authAxios.post(`${uriBase.server}/v1/user/${user?._id}/shopping-cart`, { data: data });
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};
export const getShoppingCartById = async (dispatch: Dispatch, user: any, allProducts: Products[]) => {
  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });
  let response;

  try {
    dispatch(UIActions.loadingPage(true));
    setTimeout(async () => {
      response = await authAxios.get(`${uriBase.server}/v1/user/${user?._id}/shopping-cart/products`);
      dispatch(cartActions.getShoppingCart(response.data.data));
      dispatch(UIActions.loadingPage(false));
    }, 1000);
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

export const postLikedProductById = async (dispatch: Dispatch, user: any, data: ILikedProductsId[]) => {
  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });

  try {
    await authAxios.post(`${uriBase.server}/v1/user/${user?._id}/liked`, { data: data });
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

export const getLikedProductById = async (dispatch: Dispatch, user: any) => {
  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });
  let response;
  try {
    response = await authAxios.get(`${uriBase.server}/v1/user/${user?._id}/liked/products`);
    dispatch(cartActions.getLikedProduct(response.data.data));
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

export const postAddressDelivery = async (dispatch: Dispatch, user: any, data: AddressDelivery) => {
  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });

  try {
    await authAxios.post(`${uriBase.server}/v1/user/${user?._id}/address-delivery`, { data: data });
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

export const getAddressDeliveryById = async (dispatch: Dispatch, user: any) => {
  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });

  let response;
  try {
    response = await authAxios.get(`${uriBase.server}/v1/user/${user?._id}/address-delivery/info`);
    dispatch(checkoutActions.addressDeliveryHandler(response.data.data));
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

export const postPurchasedProducts = async (
  dispatch: Dispatch,
  user: any,
  data: {
    listProducts: IPurchasedProducts;
    methodPayment: string;
  }
) => {
  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });

  try {
    await authAxios.post(`${uriBase.server}/v1/user/${user?._id}/purchased-products/post`, data);
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

export const getPurchasedProducts = async (dispatch: Dispatch, user: any) => {
  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });
  let response;

  try {
    dispatch(UIActions.loadingPage(true));
    response = await authAxios.get(`${uriBase.server}/v1/user/${user?._id}/purchased-products`);
    dispatch(checkoutActions.getAllPurchasedProductsById(response.data.data));
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};
