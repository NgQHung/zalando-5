import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fade } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProductDetail } from "../../../interfaces/ProductDetail";
import { Products } from "../../../interfaces/Products";
import { getDetailProduct, postLikedProductById } from "../../../services/apiRequest";
import { cartActions } from "../../../stores/cart-slice";
import { productActions } from "../../../stores/product-slice";
import Wrapper from "../../components/UI/wrapper/wrapper";
import WardrobeItems from "../../containers/wardrobe-list/WardrobeItems";
import WardrobeNotification from "../../containers/wardrobe-list/WardrobeNotification";
import WardrobePopup from "../../containers/wardrobe-list/WardrobePopup";
import WardrobePopup_Share from "../../containers/wardrobe-list/WardrobePopup_Share";
import { useAppDispatch, useAppSelector } from "../../hooks";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const WardrobeList = () => {
  const [notification, setNotification] = useState(false);
  const [optionPopup, setOptionPopup] = useState(false);
  const [shareProduct, setShareProduct] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState<Products>();
  const [selectSize, setSelectSize] = React.useState(false);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [restore, setRestore] = useState<boolean>(false);
  const [removedProduct, setRemovedProduct] = useState<Products[]>([]);
  const products_1 = useAppSelector((state) => state.productSlice.products_1);
  const [updateProducts, setUpdateProducts] = useState<Array<Products>>([]);
  const addedFavorite = useAppSelector((state) => state.cartSlice.addedFavorite);
  // console.log("addedFavorite: ", addedFavorite);
  const addedFavoriteProductsFromDB = useAppSelector((state) => state.productSlice.favoriteProductFromDB);
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);

  useEffect(() => {
    setUpdateProducts([...products_1]);
  }, [products_1]);

  const dispatch = useAppDispatch();

  const removeFavoriteHandler = async (id: number) => {
    const removedFavorite = addedFavorite.find((item: Products) => item?.id === id);
    const removedFavoriteFromDB = addedFavoriteProductsFromDB.find((item: ProductDetail) => item?.id === id);
    const index = updateProducts.findIndex((item: Products) => item.id === id);
    const existing = updateProducts[index];

    let update;
    if (existing) {
      const updateProduct = { ...existing, isFavorite: false };
      update = [...updateProducts];
      update[index] = updateProduct;
      dispatch(productActions.productsHandler({ products_1: update }));
    }

    // for non user

    if (removedFavorite) {
      setRemovedProduct([removedFavorite!]);
      dispatch(cartActions.removeFavorite(removedFavorite));
      setNotification(true);
    }
    // from database
    if (removedFavoriteFromDB) {
      setRemovedProduct([removedFavorite!]);
      dispatch(cartActions.removeFavorite(removedFavorite));
      setNotification(true);
    }
    setOptionPopup(false);
  };

  const addShoppingCartHandler = (selectedProduct?: Products) => {
    if (!selectedSize) {
      setSelectedFavorite(selectedProduct);
      setOptionPopup(true);
      setSelectSize(true);
      return;
    } else {
      dispatch(
        cartActions.addShoppingCartHandler({
          id: selectedProduct?.id,
          brand: selectedProduct?.brandName,
          name: selectedProduct?.name,
          imageUrl: selectedProduct?.imageUrl,
          currentPrice: selectedProduct?.price?.current?.value,
          previousPrice: selectedProduct?.price?.previous?.value,
          isFavorite: selectedProduct?.isFavorite,
          amount: 1,
          size: selectedSize,
          totalProduct: selectedProduct?.totalProduct,
        })
      );
      setSelectedSize("");
      setOptionPopup(false);
    }
  };

  useEffect(() => {
    addShoppingCartHandler(selectedFavorite);
    setOptionPopup(false);
  }, [selectedSize]);

  const restoreHandler = () => {
    setRestore(true);
    setNotification(false);
  };

  useEffect(() => {
    if (removedProduct.length === 1 && !notification && restore) {
      const idRemovedProduct = removedProduct[0]?.id;
      const checkExistingIndex = addedFavorite.findIndex((item) => item?.id === idRemovedProduct);
      const existingProduct = addedFavorite[checkExistingIndex];

      const checkExistingIndexFromDB = addedFavoriteProductsFromDB.findIndex((item) => item?.id === idRemovedProduct);
      const existingProductFromDB = addedFavoriteProductsFromDB[checkExistingIndexFromDB];
      const index = updateProducts.findIndex((item: Products) => item.id === idRemovedProduct);
      const indexFromDB = updateProducts.findIndex((item: Products) => item.id === idRemovedProduct);
      const existing = updateProducts[index];
      const existingFromDB = updateProducts[indexFromDB];
      let update;
      // for non user
      if (!existingProduct && existing) {
        const updateProduct = { ...removedProduct[0], isFavorite: true };
        dispatch(cartActions.addFavoriteHandler(updateProduct));
        update = [...updateProducts];
        update[index] = updateProduct;
        dispatch(productActions.productsHandler({ products_1: update }));
      }
      // from database
      if (!existingProductFromDB && existingFromDB) {
        const updateProduct = { ...removedProduct[0], isFavorite: true };
        dispatch(cartActions.addFavoriteHandler(updateProduct));
        update = [...updateProducts];
        update[index] = updateProduct;
        dispatch(productActions.productsHandler({ products_1: update }));
      }
      setRemovedProduct((prev) => prev.filter((item) => item.id !== idRemovedProduct));
      setRestore(false);
    }
  }, [notification]);

  let refInput = React.useRef<any>(null);

  useOnClickOutside(refInput, () => setOptionPopup(false));

  const optionsHandler = (selectedProduct: Products) => {
    setSelectedFavorite(selectedProduct);
    setSelectSize(false);

    setOptionPopup(true);
  };

  let isFirst = true;

  // useEffect(() => {
  //   if (isFirst) {
  //     isFirst = false;
  //   }
  //   console.count("running...");
  // }, [addedFavorite.length]);

  // let isFirst = true;
  React.useEffect(() => {
    if (isFirst) {
      isFirst = false;
    }
    if (!user) {
      return;
    }
    // console.log("hel;lo");
    console.log("addedFavorite:", addedFavorite);
    postLikedProductById(dispatch, user, addedFavorite);
  }, [addedFavorite.length]);

  React.useEffect(() => {
    let subscribe = true;
    // let timer;
    if (subscribe && !restore) {
      const timer = setTimeout(() => {
        setNotification(false);
      }, 5000);
      return () => {
        subscribe = false;
        clearTimeout(timer);
      };
    }
  }, [notification, restore]);

  return (
    <>
      {notification && <WardrobeNotification restoreHandler={restoreHandler} />}
      {optionPopup ? (
        <WardrobePopup
          optionPopup={optionPopup}
          setOptionPopup={setOptionPopup}
          refInput={refInput}
          removeFavoriteHandler={removeFavoriteHandler}
          selectedFavorite={selectedFavorite!}
          setSelectSize={setSelectSize}
          selectSize={selectSize}
          setSelectedSize={setSelectedSize}
        />
      ) : null}
      {shareProduct && <WardrobePopup_Share setShareProduct={setShareProduct} />}
      <Wrapper className="">
        <>
          <div className="wardrobeList_back leading-[36px] text-[#6328e0]  text-[14px] px-2 mt-6">
            <Link to="/wardrobe" className="">
              <span className="h-[14px] w-[14px] text-center">
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
              <span className="ml-2 affect_text">Zpět</span>
            </Link>
          </div>
          <div className="wardrobeList_title text-[28px] leading-[36px] lg:text-[40px] lg:leading-[48px] font-[600] tracking-[-0.28px] mb-4">
            <h1>Oblíbené předměty</h1>
          </div>
          <div className="wardrobeList-shareProduct text-left md:text-right ">
            <button
              onClick={() => setShareProduct(true)}
              className="leading-[20px] text-[#6328e0] text-[14px] px-2 mt-3"
            >
              <span className="mr-2 affect_text">Vyberte zboží ke sdílení</span>
              <FontAwesomeIcon className="h-[14px] w-[14px] text-center" icon={faArrowRight} />
            </button>
          </div>
          <ul className="wardrobeList_images flex flex-wrap ">
            {addedFavorite
              ? addedFavorite.map((product: Products, idx) => (
                  <Fade key={idx}>
                    <WardrobeItems
                      removeFavoriteHandler={removeFavoriteHandler}
                      optionsHandler={optionsHandler}
                      addShoppingCartHandler={addShoppingCartHandler}
                      product={product}
                    />
                  </Fade>
                ))
              : addedFavoriteProductsFromDB.map((product: ProductDetail, idx) => (
                  <Fade key={idx}>
                    <WardrobeItems
                      removeFavoriteHandler={removeFavoriteHandler}
                      optionsHandler={optionsHandler}
                      addShoppingCartHandler={addShoppingCartHandler}
                      product={product}
                    />
                  </Fade>
                ))}
          </ul>
        </>
      </Wrapper>
    </>
  );
};

export default WardrobeList;
