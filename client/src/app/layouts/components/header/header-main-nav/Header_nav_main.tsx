import { faBasketShopping, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import ShoppingBasket from "./header-navtools/ShoppingBasket";
import User from "./header-navtools/User";

interface IProps {
  activeHandler: (type: string) => void;
  gender: string;
  onMouseHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeaveHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  dataType: string | null;
  onHover: boolean;
  lengthAddedFavorite: number;
  lengthAddedShoppingCart: number;
  dropdown_shoppingCart: boolean;
}

const HEADER_MAIN_NAV = ({
  activeHandler,
  gender,
  onMouseHandler,
  onMouseLeaveHandler,
  dataType,
  onHover,
  lengthAddedFavorite,
  dropdown_shoppingCart,
  lengthAddedShoppingCart,
}: IProps) => {
  return (
    <div className="pt-[8px] h-[60px] flex items-center w-full ">
      {/* gender select start */}
      <ul className="hidden space-x-[8px] basis-1/3 max-w-1/3 text-[16px] font-[700] lg:flex  ">
        <Link to="/home-page">
          <li
            onClick={() => activeHandler("zeny")}
            className={"header_gender " + (gender === "zeny" ? "active_gender" : "")}
          >
            Ženy
          </li>
        </Link>
        <li
          onClick={() => activeHandler("muzi")}
          className={"header_gender " + (gender === "muzi" ? "active_gender" : "")}
        >
          Muži
        </li>
        <li
          onClick={() => activeHandler("deti")}
          className={"header_gender " + (gender === "deti" ? "active_gender" : "")}
        >
          Děti
        </li>
      </ul>
      {/* logo start */}
      <div className="basis-1/2 max-w-1/2 pl-[17px] lg:flex lg:justify-center lg:basis-1/3 lg:max-w-1/3">
        <Link to="/" className="   ">
          <img className="max-w-[120px] max-h-[60px] object-cover  " src="Logo.png" alt="logo" />
        </Link>
      </div>
      {/* logo end */}
      {/* navtools start */}
      <div className="relative basis-1/2 max-w-1/2 lg:basis-1/3 lg:max-w-1/3 flex text-[24px] space-x-[3px] justify-end ">
        <div
          onMouseEnter={onMouseHandler}
          onMouseLeave={onMouseLeaveHandler}
          datatype="user"
          className="navtools flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faUser} className="h-5 w-5 object-cover" />
          <div className={"navtools_user-hidden " + (dataType === "user" && onHover ? "navtools_user" : "")}>
            <User />
          </div>
        </div>
        <Link to="/wardrobe" className=" relative flex justify-center items-center p-[10px] cursor-pointer ">
          <FontAwesomeIcon icon={faHeart} className="h-5 w-5 object-cover" />
          <div className="absolute top-[5px] right-[3px] bg-[#ff6800] h-[16px] w-[16px] rounded-[50px] flex justify-center items-center ">
            <span className="text-white leading-[1rem] text-[0.75rem]">{lengthAddedFavorite}</span>
          </div>
        </Link>
        <div
          onMouseEnter={onMouseHandler}
          onMouseLeave={onMouseLeaveHandler}
          className={"navtools flex justify-center items-center " + (dropdown_shoppingCart ? "navtools__add" : "")}
          datatype="shopping-cart"
        >
          {/* <div className=" "> */}
          <FontAwesomeIcon icon={faBasketShopping} className="h-5 w-5 object-cover" />
          <div className="absolute top-[5px] right-[3px] bg-[#ff6800] h-[16px] w-[16px] rounded-[50px] flex justify-center items-center ">
            <span className="text-white leading-[1rem] text-[0.75rem]">{lengthAddedShoppingCart}</span>
          </div>
          {/* </div> */}
          <div
            className={
              "navtools__basket-hidden z-[10000] " +
              (dataType === "shopping-cart" && onHover
                ? "navtools__basket"
                : dropdown_shoppingCart
                ? "navtools__basket"
                : "")
            }
          >
            <ShoppingBasket />
          </div>
        </div>
      </div>
      {/* navtools end */}
    </div>
  );
};

export default HEADER_MAIN_NAV;
