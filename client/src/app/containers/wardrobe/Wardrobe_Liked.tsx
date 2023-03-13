import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { ProductDetail } from "../../../interfaces/ProductDetail";
import { Products } from "../../../interfaces/Products";
import { postLikedProductById } from "../../../services/apiRequest";
import { ImgToHttp } from "../../../utils/imageToHTTP";
import { useAppDispatch, useAppSelector } from "../../hooks";

const WARDROBE_LIKED = () => {
  const addedFavoriteProducts = useAppSelector((state) => state.cartSlice.addedFavorite);
  // const addedFavoriteProductsFromDB = useAppSelector((state) => state.cartSlice.likedProductsId);
  const addedFavoriteProductsFromDB = useAppSelector((state) => state.productSlice.favoriteProductFromDB);
  // console.log("addedFavoriteProductsFromDB:", addedFavoriteProductsFromDB);
  // console.log("addedFavoriteProducts:", addedFavoriteProducts);

  const addedFavoriteLength =
    addedFavoriteProducts?.length !== 0 ? addedFavoriteProducts.length : addedFavoriteProductsFromDB.length;
  const addedFavoriteToShow = addedFavoriteProducts.slice(0, 4);
  const addedFavoriteProductsFromDBToShow = addedFavoriteProductsFromDB.slice(0, 4);
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);
  const dispatch = useAppDispatch();

  return (
    <Link to="lists/liked" className="wardrobe_list-favorite px-2 mt-2 cursor-pointer">
      <div className="p-4 bg-[#ffff] ">
        <div className="wardrobe_list-head flex items-center">
          <h2 className="wardrobe_list-title mr-auto grow text-[20px] leading-[28px] tracking-[-.2px] lg:text-[28px] font-[600] lg:leading-[32px] lg:tracking-[-0.28px] ">
            Oblíbené předměty
          </h2>
          <h3 className="wardrobe_list-quantity leading-[24px] font-[400] tracking-[-0.16px] whitespace-nowrap mr-3 text-[#a2a3a8]">
            Počet produktů: {addedFavoriteLength}
          </h3>
          <span className="h-6 w-6 text-center">
            <FontAwesomeIcon icon={faChevronRight} className=" h-full object-cover" />
          </span>
        </div>
        <p className="wardrobe_list-content text-[22px] text_tiempos tracking-[-0.22px] font-[400] my-4">
          Mějte přehled o všem, co se vám líbí, sdílejte zboží s přáteli a zeptejte se na jejich názor.
        </p>
        <ul className="wardrobe_list-images flex ">
          {addedFavoriteToShow
            ? addedFavoriteToShow.map((item: Products, idx) => (
                <li key={idx} className="px-2 basis-1/4 max-w-[128px]">
                  <img className="w-full h-full object-cover" src={ImgToHttp(item?.imageUrl)} alt="" />
                </li>
              ))
            : addedFavoriteProductsFromDBToShow.map((item: ProductDetail, idx) => (
                <li key={idx} className="px-2 basis-1/4 max-w-[128px]">
                  <img className="w-full h-full object-cover" src={ImgToHttp(item?.media?.images[0]?.url!)} alt="" />
                </li>
              ))}
          {}
        </ul>
      </div>
    </Link>
  );
};

export default memo(WARDROBE_LIKED);
