import React, { Fragment, Suspense } from "react";
import "./Home.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { productActions } from "../../../stores/product-slice";
import { cartActions } from "../../../stores/cart-slice";
import Wrapper from "../../components/UI/wrapper/wrapper";
import ready from "../../../utils/intersectionObserver";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/ErrorBoundary";
import HOME_TOPIC from "../../containers/home/Home_topic";
import { getDetailProduct, postLikedProductById } from "../../../services/apiRequest";
import HOME_PRODUCT from "../../containers/home/Home_product";
import Loading from "../../components/UI/loader/Loading";
import { Products } from "../../../interfaces/Products";

export const Home = () => {
  const dispatch = useAppDispatch();
  const products_1 = useAppSelector((state) => state.productSlice.products_1);
  const [selectedProduct, setSelectedProduct] = React.useState<any>();
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);
  // liked products from db
  const likedProductsId = useAppSelector((state) => state.cartSlice.likedProductsId);
  const addedFavorite = useAppSelector((state) => state.cartSlice.addedFavorite);

  const loadingPage = useAppSelector((state) => state.UISlice.loading_page);

  const selectedProductHandler = (product: Products) => {
    dispatch(productActions.selectedIdHandler(product.id));
    dispatch(productActions.nameProductHandler(product.name));
    getDetailProduct(dispatch, product.id, user);
  };

  const favoriteHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const productIndex = products_1.findIndex((item) => item.name === target.getAttribute("datatype"));
    const product = products_1[productIndex];

    let update;
    if (product) {
      const updateProduct = { ...product, isFavorite: !product.isFavorite };
      setSelectedProduct(updateProduct);
      update = [...products_1];
      update[productIndex] = updateProduct;
      dispatch(productActions.productsHandler({ products_1: update }));
      // console.log("update", update);
    }
  };

  React.useEffect(() => {
    if (selectedProduct) {
      dispatch(cartActions.addFavoriteHandler(selectedProduct));
    }

    if (selectedProduct?.isFavorite === false) {
      dispatch(cartActions.removeFavorite(selectedProduct));
    }
  }, [selectedProduct]);
  let isFirst = true;

  React.useEffect(() => {
    if (isFirst) {
      isFirst = false;
    }
    if (addedFavorite.length === 0) {
      return;
    }
    postLikedProductById(dispatch, user, addedFavorite);
  }, [addedFavorite.length]);

  return (
    <Fragment>
      <div>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <Suspense
            fallback={
              <>
                {React.useEffect(() => {
                  let subscribe = true;
                  if (subscribe) {
                    ready();
                  }
                  return () => {
                    subscribe = false;
                  };
                })}
              </>
            }
          ></Suspense>
        </ErrorBoundary>
        {loadingPage && products_1.length === 0 ? (
          <>
            <Loading /> <div className="h-screen" />
          </>
        ) : (
          <Wrapper className="bg-[#229967]">
            <div className="flex flex-col w-full h-full">
              <HOME_TOPIC />
              <HOME_PRODUCT
                products={products_1}
                selectedProductHandler={selectedProductHandler}
                favoriteHandler={favoriteHandler}
              />
            </div>
          </Wrapper>
        )}

        {/* <Wrapper className="bg-[#229967] ">
          <div className="flex flex-col w-full h-full">
            <HOME_TOPIC />
            <HOME_PRODUCT
              products={products_2}
              selectedProductHandler={selectedProductHandler}
              favoriteHandler={favoriteHandler}
              selectedProduct={selectedProduct}
              favoriteAnimated={favoriteAnimated}
              updateAllProduct={updateAllProduct}
            />
          </div>
        </Wrapper> */}
      </div>
    </Fragment>
  );
};

// export default Home;
