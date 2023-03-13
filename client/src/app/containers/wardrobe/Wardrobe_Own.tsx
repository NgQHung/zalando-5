import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const WARDROBE_OWN = () => {
  return (
    <Link to="lists/owned" className="wardrobe_list-purchased px-2 mt-2 cursor-pointer">
      <div className="p-4 bg-[#ffff] ">
        <div className="wardrobe_list-head flex items-center">
          <h2 className="wardrobe_list-title mr-auto grow text-[20px] leading-[28px] tracking-[-.2px] lg:text-[28px] font-[600] lg:leading-[32px] lg:tracking-[-0.28px] ">
            Vlastní předměty
          </h2>
          <h3 className="wardrobe_list-quantity leading-[24px] font-[400] tracking-[-0.16px] whitespace-nowrap mr-3 text-[#a2a3a8]">
            Počet produktů: 32
          </h3>
          <span className="h-6 w-6 text-center">
            <FontAwesomeIcon icon={faChevronRight} className=" h-full object-cover" />
          </span>
        </div>
        <p className="wardrobe_list-content text-[22px] text_tiempos tracking-[-0.22px] font-[400] my-4">
          Ohodnoťte produkt, zkontrolujte velikost nebo si něco kupte znovu (a znovu).
        </p>
        <ul className="wardrobe_list-images flex ">
          <li className="pr-2 basis-1/4">
            <img
              className="max-sw-[128px] object-cover"
              src="https://images.unsplash.com/photo-1665686304129-a6e2d16923e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </li>
          <li className="px-2 basis-1/4">
            <img
              className="w-[128px] object-cover"
              src="https://images.unsplash.com/photo-1665686304129-a6e2d16923e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default memo(WARDROBE_OWN);
