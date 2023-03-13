import { faChevronDown, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ShoppingProducts } from "../../../interfaces/ShoppingProducts";
import { cartActions } from "../../../stores/cart-slice";
// import { amountRemovedHandler } from "../../../stores/UI-slice";
import { formatPrice } from "../../../utils/formatPrice";
import { ImgToHttp } from "../../../utils/imageToHTTP";
import { useAppDispatch } from "../../hooks";

interface IProps {
  data: ShoppingProducts;
}

const CART_ITEM = ({ data }: IProps) => {
  const dispatch = useAppDispatch();
  const removeProductShoppingCartHandler = (id: number, size: string) => {
    dispatch(cartActions.removeShoppingCartHandler({ id: id, size: size }));
    // amountRemovedHandler(dispatch, 500);
  };
  const addProductFavoriteHandler = (product: ShoppingProducts) => {
    dispatch(cartActions.addFavoriteHandler(product));
  };
  return (
    <div className="product-content relative text-[14px] leading-[18px] tracking-[0.5px] mb-[24px] flex ">
      <div className="product-img w-[86px] mr-3 shrink-0 ">
        <img className="w-full h-auto object-cover" src={ImgToHttp(data.imageUrl)} alt={data.name} />
      </div>
      <div className="product-detail flex flex-col ">
        <div className="product-title mb-[2px]">{data.name}</div>
        <div className="product-brand mb-[2px]">{data.brandName}</div>
        <div className="product-size mb-[2px]">{data.size}</div>
        <div className="subactions absolute bottom-0 text-[12px] leading-[14px] text-[#999]">
          <FontAwesomeIcon icon={faTrash} className="mr-[6.4px]" />
          <button onClick={() => removeProductShoppingCartHandler(data.id, data?.size!)} className="py-[8px] pr-[14px]">
            Odstranit
          </button>
          <span>|</span>
          <FontAwesomeIcon icon={faHeart} className="pl-[14px] mr-[6.4px]" />
          <button onClick={() => addProductFavoriteHandler(data)} className="py-[8px] pr-[14px]">
            Přesunout na seznam přání
          </button>
        </div>
      </div>
      <div className="ml-auto">
        <div className="product-add-size  h-10 w-[100px] border border-[#1a1a1a] flex justify-between items-center cursor-pointer ">
          <span className="p-2">{data.amount}</span>
          <FontAwesomeIcon className="p-2" icon={faChevronDown} />
        </div>
        <div className="product-total absolute bottom-0 right-0 text-[14px] leading-[16px] font-[700] py-[8px] pr-[14px]">
          {formatPrice(data.totalProduct)}
        </div>
      </div>
    </div>
  );
};

export default CART_ITEM;
