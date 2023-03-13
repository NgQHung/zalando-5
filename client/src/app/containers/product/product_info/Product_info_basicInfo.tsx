import { faBox, faBoxOpen, faCircleInfo, faRotateLeft, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PRODUCT_INFO_BASICINFO = () => {
  return (
    <div className="border border-[#66676e] mt-12 ">
      <div className="py-4 px-6 border-b border-[#66676e]">
        <FontAwesomeIcon icon={faTruck} className="h-5 w-5" />
        <div className="flex justify-between mt-2">
          <span className="font-[700] text-[14px]">2-5 pracovní dny</span>{" "}
          <span className="font-[700] text-[14px]">zdarma</span>
        </div>
        <p className="mt-1">Standardní doručení</p>
      </div>
      <p className="border-b border-[#66676e] py-4 px-6 ">
        <FontAwesomeIcon className="h-5 w-5 mr-3" icon={faBox} />
        <span>Bezplatná doprava a vrácení zboží</span>
      </p>
      <p className="border-b border-[#66676e] py-4 px-6 ">
        <FontAwesomeIcon className="h-5 w-5 mr-3" icon={faRotateLeft} />
        <span>Vrácení zboží do 100 dní</span>
      </p>
      <div className="py-4 px-6 flex justify-between">
        <p>
          <FontAwesomeIcon className="h-5 w-5 mr-3" icon={faBoxOpen} />

          <span>Prodejte je zpět</span>
        </p>
        <FontAwesomeIcon className="h-5 w-5 cursor-pointer" icon={faCircleInfo} />
      </div>
    </div>
  );
};

export default PRODUCT_INFO_BASICINFO;
