import { faBagShopping, faEllipsis, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";
import { Products } from "../../../interfaces/Products";
import { ImgToHttp } from "../../../utils/imageToHTTP";

interface IProps {
  removeFavoriteHandler: (id: number) => void;
  optionsHandler: (selectedProduct: Products) => void;
  addShoppingCartHandler: (selectedProduct: Products) => void;
  product: any;
}

const WardrobeItems = ({ removeFavoriteHandler, optionsHandler, addShoppingCartHandler, product }: IProps) => {
  return (
    <div className="px-2 ">
      <li className=" max-w-[288px] mb-[36px] basis-full xs:basis-1/2 md:basis-1/4 md:min-w-[25%] mt-6">
        <div className="relative">
          <img
            className="w-full h-full object-cover"
            // src="Skeleton-img.png"
            src={product?.imageUrl ? ImgToHttp(product.imageUrl) : ImgToHttp(product.media.images[0].url)}
            alt=""
          />
          <button
            onClick={() => removeFavoriteHandler(product?.id)}
            className="h-12 w-12 text-center absolute top-3 right-0 p-3 bg-[#ffff]"
          >
            <FontAwesomeIcon icon={faXmark} className="h-full object-cover" />
          </button>
          <div className="flex flex-col absolute bottom-3 right-0">
            <button onClick={() => optionsHandler(product)} className="h-12 w-12 text-center p-3 bg-[#ffff]">
              <FontAwesomeIcon icon={faEllipsis} className="h-full object-cover" />
            </button>
            <button
              onClick={() => addShoppingCartHandler(product)}
              className="h-12 w-12 text-center p-3 bg-[#1a1a1a] text-[#ffff]"
            >
              <FontAwesomeIcon icon={faBagShopping} className="h-full object-cover" />
            </button>
          </div>
        </div>
        <div className=" leading-[20px] pt-2">
          <div className="pb-[8px]">
            <h3>{product?.brandName}</h3>
            <h3>{product?.name}</h3>
          </div>
          <div className="flex flex-col leading-[1.25rem] text-[700]">
            <span>{product?.price?.current?.text}</span>
            {product?.price?.previous?.value !== null && (
              <div className="text-[12px] leading-[16px]">
                <span>Původně:</span>
                <span>{product?.price?.previous?.text}</span>
                <span>20%</span>
              </div>
            )}
          </div>
        </div>
      </li>
    </div>
  );
};

export default memo(WardrobeItems);
