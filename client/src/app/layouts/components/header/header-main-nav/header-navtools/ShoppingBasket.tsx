import React, { Fragment, memo, useCallback, useMemo, useState } from "react";
import { cartActions } from "../../../../../../stores/cart-slice";
import { formatPrice } from "../../../../../../utils/formatPrice";
import { ImgToHttp } from "../../../../../../utils/imageToHTTP";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import Loader from "../../../../../components/UI/loader/Loader";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import "./navtools.css";
import { Box, ListItem, ListItemText } from "@mui/material";
import { amountRemovedHandler, UIActions } from "../../../../../../stores/UI-slice";
import { ShoppingProducts } from "../../../../../../interfaces/ShoppingProducts";
import { Link, useNavigate } from "react-router-dom";
import { postLikedProductById, postShoppingCartById } from "../../../../../../services/apiRequest";
import { useFirstRender } from "../../../../../../utils/useFirstRender";
import { refreshPage } from "../../../../../../utils/refreshPage";

let isFirst = true;

const ShoppingBasket = () => {
  const dispatch = useAppDispatch();
  const addedShoppingCart = useAppSelector((state) => state.cartSlice.addedShoppingCart) || [];
  const loading__total = useAppSelector((state) => state.UISlice.loading__total);
  const total = useAppSelector((state) => state.cartSlice.total);
  const dropdownOnHover = useAppSelector((state) => state.UISlice.dropdown_onHover_shoppingCart);
  const amountRemoved = useAppSelector((state) => state.UISlice.amountRemoved);
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);
  const addedLikedProduct = useAppSelector((state) => state.cartSlice.addedFavorite);
  const addedFavoriteProductsFromDB = useAppSelector((state) => state.cartSlice.likedProductsId);

  const amountOfProducts = addedShoppingCart.reduce((acc, curr) => curr.amount + acc, 0);

  const navigate = useNavigate();

  const lengthAddedShoppingCart = useMemo(() => addedShoppingCart.length, [addedShoppingCart.length]) || 0;
  const [shadow, setShadow] = React.useState(true);
  const [posProduct, setPosProduct] = useState<number | null>(null);

  const scrollRef = React.useRef<any>(null);
  const removeProductShoppingCartHandler = (id: number, size: string, index: number) => {
    dispatch(cartActions.removeShoppingCartHandler({ id: id, size: size }));
    setPosProduct(index);
    amountRemovedHandler(dispatch, 500);
  };
  const addProductFavoriteHandler = (product: ShoppingProducts) => {
    dispatch(cartActions.addFavoriteHandler(product));
  };

  const onScrollHandler = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (lengthAddedShoppingCart >= 3 && scrollTop > 0 && scrollHeight > 635) {
      setShadow(true);
    } else if (Math.ceil(scrollTop) + clientHeight === scrollHeight) {
      setShadow(false);
    } else setShadow(false);
  }, [lengthAddedShoppingCart]);

  const [onHoverShoppingCart, setOnHoverShoppingCart] = React.useState(false);

  const onMouseHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOnHoverShoppingCart(true);
  };

  const onMouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOnHoverShoppingCart(false);
    dispatch(cartActions.notificationRemovedProduct(false));
  };

  const navigateCartPageHandler = () => {
    // dispatch(UIActions.dropdown_shoppingCart(false));
    navigate("/cart");
  };

  const ref = React.useRef<any>(null);

  React.useEffect(() => {
    if (lengthAddedShoppingCart < 3) {
      setShadow(false);
    }
  }, [lengthAddedShoppingCart]);

  // console.log(addedShoppingCart.length);
  React.useEffect(() => {
    let subscribe = true;
    if (isFirst) {
      isFirst = false;
      return;
    }
    if (subscribe && user && !(localStorage.getItem("persist:root") === "")) {
      postShoppingCartById(dispatch, user, addedShoppingCart);
      // console.log("from ShoppingBasket");
    }
    if (addedLikedProduct.length > 0) {
      postLikedProductById(dispatch, user, addedLikedProduct);
    } else if (addedFavoriteProductsFromDB.length > 0) {
      postLikedProductById(dispatch, user, addedFavoriteProductsFromDB);
    }

    return () => {
      subscribe = false;
    };
  }, [amountOfProducts]);

  return (
    <Fragment>
      <Box ref={ref} className="">
        {lengthAddedShoppingCart === 0 || (lengthAddedShoppingCart === 0 && dropdownOnHover && !onHoverShoppingCart) ? (
          <Fragment>
            <div className="text-center z-[10000] ">
              <div className="mt-[24px] text-[16px] font-[700]">
                <p>VÁŠ NÁKUPNÍ KOŠÍK JE PRÁZDNÝ</p>
              </div>
              <div className="px-[24px] text-[12px]">
                <p>Jděte a splňte si své módní sny a touhy.</p>
              </div>
            </div>
            <div className="bg-[#eeee] text-[#1a1a1a] w-full h-full text-center">
              <div className="pt-[36px] pb-[23px] px-[20px]  ">
                <div className="text-[16px] font-[700]">
                  <p>NEVÍTE, KDE ZAČÍT?</p>
                </div>
                <div className="effect_bg relative text-[12px] mt-[16px] border border-[#1a1a1a] ">
                  <div>
                    <button className="py-[8px] px-[14px] font-[700]">
                      <span>Podívejte se, co je nového</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <div
            onMouseEnter={onMouseHandler}
            onMouseLeave={onMouseLeaveHandler}
            // component="div"
            className={"text-center max-h-[600px] relative flex flex-col justify-between z-[10000] "}
          >
            <p className="text-[16px] mt-[24px] px-[36px] font-[700]">VÁŠ NÁKUPNÍ KOŠÍK</p>
            {/* showing product start */}
            <div className={" shopping__cart-shadow-product " + (shadow ? " " : "")}>
              <div
                onScroll={onScrollHandler}
                ref={scrollRef}
                className={
                  " relative min-h-[300px] max-h-[558px] overflow-y-auto scrollbar_hidden pb-[115px] " +
                  (lengthAddedShoppingCart === 0 ? "min-h-[200px]" : "")
                }
              >
                <div
                  className={
                    "shoppingCart_border " + (lengthAddedShoppingCart === 0 ? "shoppingCart_border-active" : "")
                  }
                />
                <TransitionGroup component="div">
                  {addedShoppingCart?.map((product: ShoppingProducts, idx: number) => (
                    <Collapse key={idx}>
                      <ListItem className={"flex text-[14px] flex-col "}>
                        <ListItemText
                          primary={
                            <>
                              <div className="flex py-[4px] text-[12px] px-[15px]">
                                <div className="py-3 px-2 self-start shrink-0">
                                  <img
                                    src={ImgToHttp(product?.imageUrl)}
                                    alt="photos"
                                    className="h-[96px] object-cover "
                                  />
                                </div>
                                <div className="flex flex-col grow py-3 px-2">
                                  <div className=" ml-[15px] leading-[18px] ">
                                    <div className="flex">
                                      <div className="max-w-[100px] text-left">
                                        <p>{product.brandName}</p>
                                        <p className="pt-[5px] leading-[23px] whitespace-nowrap text-ellipsis max-w-[200px] overflow-hidden ">
                                          {product.name}
                                        </p>
                                      </div>
                                      <div className="flex flex-col w-full text-[10px] text-right  ">
                                        <span className="text-[14px] text-[#eb0037] mt-[2px] font-[700]">
                                          {formatPrice(product.currentPrice)}
                                        </span>
                                        {product.previousPrice && <span>{formatPrice(product.previousPrice)}</span>}
                                      </div>
                                    </div>
                                    <div className="text-left">
                                      <p>
                                        <span className="text-[12px] pr-1">Size:</span> {product?.size}
                                      </p>
                                      {/* <motion.div initial={{ scale: 1 }} animate={amountRemoved ? "scale: 1" : ""}> */}
                                      <p
                                        className={
                                          "shoppingCart_amount-removed " +
                                          (amountRemoved && posProduct === idx
                                            ? "shoppingCart_amount-removed-active"
                                            : "")
                                        }
                                      >
                                        <span className={"text-[12px] pr-1 "}>Amount:</span> {product?.amount}
                                      </p>
                                      {/* </motion.div> */}
                                    </div>
                                  </div>
                                  <div className="flex mt-[22px] flex-col text-left ml-[15px] leading-[20px] text-[#999] tracking-[0.5px] cursor-pointer  ">
                                    <div>
                                      <span
                                        onClick={() => addProductFavoriteHandler(product)}
                                        className="text-[10px] affect_text"
                                      >
                                        Přesunout na seznam přání
                                      </span>
                                    </div>
                                    <div>
                                      <span
                                        onClick={() =>
                                          removeProductShoppingCartHandler(product.id, product?.size!, idx)
                                        }
                                        className="text-[10px] cursor-pointer affect_text"
                                      >
                                        Odebrat položku
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          }
                        ></ListItemText>
                      </ListItem>
                    </Collapse>
                  ))}
                </TransitionGroup>
              </div>
            </div>

            {/* showing product end */}

            <div
              className={
                "absolute bottom-0 w-full left-0 right-0 h-[114px] shrink-0 grow bg-[#ffff] border-b border-[#1a1a1a] shoppingCart__height " +
                (shadow ? "shopping__cart-shadow-total" : "")
              }
            >
              <div className="px-[18px] flex justify-between items-center text-[14px]">
                <p className="self-start leading-[20px]">Doprava</p>
                <p className="self-end leading-[20px]">0.00</p>
              </div>
              <div className="py-2 px-[18px] flex justify-between items-center">
                <p className="text-[12px] text-left ">Celkem(Vč. DPH)</p>
                {loading__total ? (
                  <Loader />
                ) : (
                  <p className="self-end text-[16px] font-bold leading-[23px]">{formatPrice(total)}</p>
                )}
              </div>
              <div className="pb-[18px] text-[14px] px-[18px] leading-[18px]  hover:opacity-70 text-center text-[#ffff] ">
                <button
                  onClick={navigateCartPageHandler}
                  className="px-4  py-[10px] rounded-sm bg-[#1a1a1a] w-full font-[700]"
                >
                  <span className="">Přejít do nákupního košíku</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Fragment>
  );
};

export default memo(ShoppingBasket);
