import React, { Fragment, useState } from "react";
import { ProductDetail } from "../../../../interfaces/ProductDetail";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { cartActions } from "../../../../stores/cart-slice";
import { disabledHandlerHandler, UIActions } from "../../../../stores/UI-slice";
import Product_info_intro from "./Product_info_intro";
import PRODUCT_INFO_SELECTSIZE from "./Product_info_selectSize";
import PRODUCT_INFO_BASICINFO from "./Product_info_basicInfo";
import PRODUCT_INFO_DETAILEDINFO from "./Product_info_detailedInfo";
import PRODUCT_INFO_RATE from "./Product_info_rate";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import _ from "lodash";
import { toast } from "react-toastify";
import { productActions } from "../../../../stores/product-slice";
import { Products } from "../../../../interfaces/Products";
import { ShoppingProducts } from "../../../../interfaces/ShoppingProducts";
// import { useFirstRender } from "../../../../utils/useFirstRender";
// import { refreshPage } from "../../../../utils/refreshPage";

interface Iprops {
  selectedProduct: ProductDetail;
}

let isFirst = true;
const Product_info = ({ selectedProduct }: Iprops) => {
  const [nameDropdown, setNameDropdown] = useState<Record<string, any>>({
    selectSize: "",
    material: "",
    details: "",
    size: "",
  });
  const [sizeProduct, setSizeProduct] = useState("");
  const [selectedFavoriteProduct, setSelectedFavoriteProduct] = useState<Products>();

  // const
  const loading__add = useAppSelector((state) => state.UISlice.loading__add);
  const bg_color_shopping_cart = useAppSelector((state) => state.UISlice.bg_color_shopping_cart);
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);
  const addedShoppingCart = useAppSelector((state) => state.cartSlice.addedShoppingCart);
  const addedLikedProduct = useAppSelector((state) => state.cartSlice.addedFavorite);
  const allProducts: Products[] = useAppSelector((state) => state.productSlice.allProducts) || [];
  const getSelectedId = JSON.parse(localStorage.getItem("selectedId")!) || [];

  const dispatch = useAppDispatch();

  const dropdownHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name } = e.currentTarget;
    if (nameDropdown[name] === name) {
      setNameDropdown((prev) => ({ ...prev, [name]: "" }));
    } else {
      setNameDropdown((prev) => ({ ...prev, [name]: name }));
    }
  };

  const sizeProductHandler = (size: string) => {
    setSizeProduct(size);
    setNameDropdown((prev) => ({ ...prev, selectSize: "" }));
  };

  const addShoppingCartHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    // console.log(selectedProduct);
    const productIndex1: number = allProducts.findIndex((item: Products) => item.id === selectedProduct?.id);
    const product: Products = allProducts[productIndex1];

    const updateProduct: ShoppingProducts = {
      id: product.id,
      brandName: product.brandName,
      name: product.name,
      imageUrl: product.imageUrl,
      currentPrice: product.price.current.value,
      previousPrice: product?.price?.previous?.value!,
      amount: 1,
      size: sizeProduct,
      totalProduct: product?.price?.current?.value,
    };
    if (!sizeProduct) {
      setNameDropdown((prev) => ({ ...prev, selectSize: "selectSize" }));
      return;
    } else {
      const promise = new Promise<void>((resolve) => {
        return resolve();
      });
      promise
        .then(() => {
          dispatch(UIActions.loading__add({ loading__add: true }));
          return new Promise((resolve) =>
            setTimeout(() => {
              dispatch(UIActions.loading__add({ loading__add: false }));
              resolve(dispatch(cartActions.addShoppingCartHandler(updateProduct)));
            }, 500)
          );
        })
        .then(() => {
          dispatch(UIActions.backgroundColor__shoppingCart(true));
          setTimeout(() => {
            dispatch(UIActions.backgroundColor__shoppingCart(false));
          }, 500);
        })
        .then(() => {
          dispatch(UIActions.dropdown_shoppingCart(true));

          return setTimeout(() => {
            dispatch(UIActions.dropdown_shoppingCart(false));
          }, 3000);
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
      disabledHandlerHandler(dispatch, 1000);
    }
  };

  const addProductFavoriteHandler = () => {
    const productIndex = allProducts.findIndex((item: Products) => item.id === getSelectedId);
    // console.log(selectedId);
    const product = allProducts[productIndex];
    let update;
    if (product) {
      const updateProduct1 = { ...product, isFavorite: !product.isFavorite };
      setSelectedFavoriteProduct(updateProduct1);
      update = [...allProducts];
      update[productIndex] = updateProduct1;
      dispatch(productActions.productsHandler({ allProducts: update }));
    }
  };

  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setNameDropdown((prev) => ({ ...prev, selectSize: "" })));

  React.useEffect(() => {
    if (selectedFavoriteProduct) {
      dispatch(cartActions.addFavoriteHandler(selectedFavoriteProduct));
    }

    if (selectedFavoriteProduct?.isFavorite === false) {
      dispatch(cartActions.removeFavorite(selectedFavoriteProduct));
    }
  }, [selectedFavoriteProduct]);

  React.useEffect(() => {
    // const productIndex = getSelectedId
  }, []);

  return (
    <Fragment>
      <div className="mx-6 mt-6 md:m-0 md:min-w-1/2 md:max-w-1/2 flex flex-col md:basis-1/2 ">
        <div className="px-2 lg:ml-[100px] ">
          <Product_info_intro selectedProduct={selectedProduct} />
          {/* select your size start */}
          <PRODUCT_INFO_SELECTSIZE
            inputRef={ref}
            sizeProduct={sizeProduct}
            dropdownHandler={dropdownHandler}
            sizeProductHandler={sizeProductHandler}
            addShoppingCartHandler={addShoppingCartHandler}
            addProductFavoriteHandler={addProductFavoriteHandler}
            bg_color_shopping_cart={bg_color_shopping_cart}
            loading__add={loading__add}
            nameDropdown={nameDropdown}
            selectedProduct={selectedProduct}
            selectedFavoriteProduct={selectedFavoriteProduct!}
          />
          {/* select your size end */}
          <PRODUCT_INFO_BASICINFO />
          {/* infor start */}
          <PRODUCT_INFO_DETAILEDINFO dropdownHandler={dropdownHandler} nameDropdown={nameDropdown} />
          {/* infor end */}

          {/* stars start */}
          <PRODUCT_INFO_RATE />
          {/* stars end */}
        </div>
      </div>
    </Fragment>
  );
};

export default Product_info;
