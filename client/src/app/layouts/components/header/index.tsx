import React, { memo, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faHeart, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
// import User from "./header-main-nav/header-navtools/User";
import "./Header.css";
import HeaderCategory from "./header-category";
// import ShoppingBasket from "./header-main-nav/header-navtools/ShoppingBasket";
// import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { UIActions } from "../../../../stores/UI-slice";
import HEADER_BASIC_INFO from "./header-basic-info/Header_Basic_Info";
import HEADER_MAIN_NAV from "./header-main-nav/Header_nav_main";

const Header = () => {
  const [gender, setGender] = useState("zeny");
  const [onHover, setOnHover] = useState(false);
  const addedShoppingCart = useAppSelector((state) => state.cartSlice.addedShoppingCart) || [];
  const addedFavorite = useAppSelector((state) => state.cartSlice.addedFavorite);
  const addedFavoriteProductsFromDB = useAppSelector((state) => state.cartSlice.likedProductsId);

  const [dataType, setDataType] = useState<string | null>("");
  const dropdown_shoppingCart = useAppSelector((state) => state.UISlice.dropdown_shoppingCart);
  const lengthAddedShoppingCart = addedShoppingCart.length;
  // const lengthAddedFavorite = addedFavorite ? addedFavorite.length : 0;
  const lengthAddedFavorite = addedFavorite?.length !== 0 ? addedFavorite.length : addedFavoriteProductsFromDB.length;
  const dispatch = useAppDispatch();

  const activeHandler = (type: string) => {
    setGender(type);
  };

  const onMouseHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;

    setDataType(target.getAttribute("datatype"));
    setOnHover(true);
  };
  const onMouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOnHover(false);
    dispatch(UIActions.dropdown_onHover(true));
    setDataType("");
  };

  const bg_color_header = useAppSelector((state) => state.UISlice.bg_color_header);

  return (
    <div className="relative border-b border-[#d0d1d3]">
      <div className=" min-h-[96px]">
        <HEADER_BASIC_INFO bg_color_header={bg_color_header} />
        <div className=" lg:px-2 bg-[#ffffff] text-[14px] lg:mx-6 xl:mx-auto xl:my-0 lg:max-w-[1216px] lg:min-w-[943px] ">
          <HEADER_MAIN_NAV
            activeHandler={activeHandler}
            gender={gender}
            onMouseHandler={onMouseHandler}
            onMouseLeaveHandler={onMouseLeaveHandler}
            dataType={dataType}
            onHover={onHover}
            lengthAddedFavorite={lengthAddedFavorite}
            dropdown_shoppingCart={dropdown_shoppingCart}
            lengthAddedShoppingCart={lengthAddedShoppingCart}
          />
          {/* search start */}
          <HeaderCategory />
          {/* search end */}
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
