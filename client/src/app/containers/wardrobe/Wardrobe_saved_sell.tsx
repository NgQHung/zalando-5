import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";

const WARDROBE_SAVED_SELL = () => {
  return (
    <Fragment>
      <Link to="lists/liked-outfits" className="wardrobe_savedOutfit  px-2 mt-2 cursor-pointer">
        <div className="p-4 bg-[#ffff]">
          <div className="wardrobe_list-head flex items-center">
            <h2 className="wardrobe_list-title mr-auto grow text-[20px] leading-[28px] tracking-[-.2px] lg:text-[28px] font-[600] lg:leading-[32px] lg:tracking-[-0.28px] ">
              Uložené outfity
            </h2>
            <span className="h-6 w-6 text-center">
              <FontAwesomeIcon icon={faChevronRight} className=" h-full object-cover" />
            </span>
          </div>
          <p className="wardrobe_list-content text-[22px] text_tiempos tracking-[-0.22px] font-[400] my-4">
            Osrdíčkujte své oblíbené outfity a ony na vás budou čekat (až je budete potřebovat).
          </p>
          <div className="wardrobe_list-btn flex ">
            <button className="text-center p-3 bg-[#1a1a1a] text-[#ffff] hover:opacity-80  ">
              <span className="font-[700] text-ellipsis leading-[24px] text-[16px]">Inspirujte se</span>
            </button>
          </div>
        </div>
      </Link>
      <Link to="lists/sell" className="wardrobe_sellYourProduct px-2 mt-2 cursor-pointer">
        <div className="p-4 bg-[#ffff] ">
          <div className="wardrobe_list-head flex items-center">
            <h2 className="wardrobe_list-title mr-auto grow text-[20px] leading-[28px] tracking-[-.2px] lg:text-[28px] font-[600] lg:leading-[32px] lg:tracking-[-0.28px] ">
              Prodejte své předměty
            </h2>
            <span className="h-6 w-6 text-center">
              <FontAwesomeIcon icon={faChevronRight} className=" h-full object-cover" />
            </span>
          </div>
          <p className="wardrobe_list-content text-[22px] text_tiempos tracking-[-0.22px] font-[400] my-4">
            Prodejte své lehce nošené oblečení za kredit a udělejte si místo v šatníku.
          </p>
        </div>
      </Link>
    </Fragment>
  );
};

export default memo(WARDROBE_SAVED_SELL);
