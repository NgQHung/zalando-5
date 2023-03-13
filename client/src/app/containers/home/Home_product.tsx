import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Products } from "../../../interfaces/Products";
import WrapperRowFull from "../../components/UI/wrapper/WrapperRowFull";
import { useAppSelector } from "../../hooks";

interface IProps {
  products: Products[];
  selectedProductHandler: (product: Products) => void;
  favoriteHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const HOME_PRODUCT = ({ products, selectedProductHandler, favoriteHandler }: IProps) => {
  const likedProduct = useAppSelector((state) => state.cartSlice.addedFavorite);
  const addedFavorite = useAppSelector((state) => state.cartSlice.addedFavorite);
  const addedFavoriteProductsFromDB = useAppSelector((state) => state.productSlice.favoriteProductFromDB);
  // console.log(likedProduct);
  return (
    <WrapperRowFull className="h-[584px] bg-[#34d27b] ">
      <>
        <div className=" flex pt-[36px] pb-[24px] text-[14px] ">
          {products?.map((item: Products) => (
            <div key={item.id} className="first:ml-[36px] md:first:ml-[48px] lg:first:ml-[152px]">
              <div className="relative h-[415px] w-[296px] px-[8px] cursor-pointer">
                <div datatype={item.name} onClick={favoriteHandler} className="absolute bg-[#ffff] top-2 right-2">
                  <FontAwesomeIcon
                    type="checkbox"
                    icon={faHeart}
                    className={
                      "fa-thin p-[8px] text-[24px] " + (item?.isFavorite === true ? "favorite_added-active" : "")
                    }
                  />
                </div>
                <Link onClick={() => selectedProductHandler(item)} to={`/${item.name}`}>
                  <img
                    src="Skeleton-img.png"
                    className="w-[288px] h-[415px] object-cover"
                    lazy-src={`https://${item?.imageUrl}`}
                    alt="product"
                  />
                  <div className=" leading-[20px] pt-2">
                    <div className="pb-[8px]">
                      <h3>{item.brandName}</h3>
                      <h3>{item.name}</h3>
                    </div>
                    <div className="flex flex-col leading-[1.25rem] text-[700]">
                      <span>{item?.price?.current?.text}</span>
                      {item?.price?.previous?.value !== null && (
                        <div className="text-[12px] leading-[16px]">
                          <span>Původně:</span>
                          <span>{item?.price?.previous?.text}</span>
                          <span>20%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="absolute bg-[#ffff] right-[152px] top-1/2 translate-y-[-50%]">
          <FontAwesomeIcon icon={faArrowRight} className="p-2 text-[24px]" />
        </div> */}
      </>
    </WrapperRowFull>
  );
};

export default HOME_PRODUCT;
