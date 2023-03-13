import { faChevronDown, faChevronUp, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";
import { ProductDetail } from "../../../../interfaces/ProductDetail";
import { Products } from "../../../../interfaces/Products";
import ButtonPrimary from "../../../components/UI/button/Button";
import Loader from "../../../components/UI/loader/Loader";

interface IProps {
  inputRef: React.RefObject<HTMLDivElement>;
  sizeProduct: string;
  dropdownHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sizeProductHandler: (size: string) => void;
  addShoppingCartHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  addProductFavoriteHandler: () => void;
  bg_color_shopping_cart: boolean;
  loading__add: boolean;
  nameDropdown: Record<string, any>;
  selectedProduct: ProductDetail;
  selectedFavoriteProduct: Products;
}

const PRODUCT_INFO_SELECTSIZE = ({
  sizeProduct,
  inputRef,
  dropdownHandler,
  sizeProductHandler,
  addShoppingCartHandler,
  addProductFavoriteHandler,
  bg_color_shopping_cart,
  loading__add,
  nameDropdown,
  selectedProduct,
  selectedFavoriteProduct,
}: IProps) => {
  return (
    <div className="mt-9">
      {/* select your size start */}
      <div ref={inputRef} className="  mb-2 relative ">
        <button
          name="selectSize"
          className={
            "flex justify-between cursor-pointer w-full p-3 border border-[#1a1a1a] " +
            (!sizeProduct ? "outline_onHover" : "outline_effect hover:bg-[#e9e9ed]")
          }
          onClick={dropdownHandler}
        >
          <span className="">{sizeProduct ? sizeProduct : "Zvolte svou velikost"} </span>
          {nameDropdown.selectSize ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
        </button>

        <div className={"size_dropdown_hidden z-[1000] " + (nameDropdown.selectSize ? "size_dropdown" : "")}>
          <div className="hover:bg-[#e9e9ed] transition-all">
            <div
              onClick={() => sizeProductHandler("S")}
              className="py-4 pr-3 ml-6 text-[16px] cursor-pointer border-b-[2px] border-[#e9e9ed] font-[700]"
            >
              S
            </div>
          </div>
          <div onClick={() => sizeProductHandler("M")} className="hover:bg-[#e9e9ed] transition-all">
            <div className="py-4 pr-3 ml-6 text-[16px] cursor-pointer border-b-[2px] border-[#e9e9ed] font-[700]">
              M
            </div>
          </div>
          <div onClick={() => sizeProductHandler("L")} className="hover:bg-[#e9e9ed] transition-all">
            <div className="py-4 pr-3 ml-6 text-[16px] cursor-pointer border-b-[2px] border-[#e9e9ed] font-[700]">
              L
            </div>
          </div>
          <div onClick={() => sizeProductHandler("XL")} className="hover:bg-[#e9e9ed] transition-all">
            <div className="py-4 pr-3 ml-6 text-[16px] cursor-pointer border-b-[2px] border-[#e9e9ed] font-[700]">
              XL
            </div>
          </div>
          <div onClick={() => sizeProductHandler("XXL")} className="hover:bg-[#e9e9ed] transition-all">
            <div className="py-4 pr-3 ml-6 text-[16px] cursor-pointer border-b-[2px] border-[#e9e9ed] font-[700]">
              XXL
            </div>
          </div>
        </div>
      </div>
      {/* select your size end */}

      <div className="flex items-center w-full justify-between gap-2">
        <ButtonPrimary
          onClick={addShoppingCartHandler}
          className={
            " grow " +
            (!nameDropdown.selectSize ? "hover:opacity-70 " : "") +
            (bg_color_shopping_cart ? "bg-[#47ac3a]" : "bg-[#1a1a1a]")
          }
        >
          {loading__add ? <Loader /> : <span>Přidat do nákupního košíku</span>}
        </ButtonPrimary>
        <div
          datatype={selectedProduct.name}
          onClick={addProductFavoriteHandler}
          className={"h-[48px] w-[48px] cursor-pointer p-2 shrink-0 border border-[#1a1a1a] outline_onHover "}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={
              "h-full w-full object-cover " +
              (selectedFavoriteProduct?.isFavorite === true ? "favorite_added-active" : "")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default memo(PRODUCT_INFO_SELECTSIZE);
