import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PRODUCT_INFO_RATE = () => {
  return (
    <div className="mt-12">
      <p>Hodnocení</p>
      <div className="flex justify-between items-center">
        <p>5/5</p>
        <p>
          <FontAwesomeIcon className="h-6" icon={faStar} />
          <FontAwesomeIcon className="h-6" icon={faStar} />
          <FontAwesomeIcon className="h-6" icon={faStar} />
          <FontAwesomeIcon className="h-6" icon={faStar} />
          <FontAwesomeIcon className="h-6" icon={faStar} />
        </p>
      </div>
      <ul className="mt-6">
        <li className="flex justify-between items-center">
          <label className="mr-2 text-[12px] min-w-[24px] mb-1">5</label>
          <span className="h-[3px] bg-[#1a1a1a] w-full" />
        </li>
        <li className="flex justify-between items-center mb-1">
          <label className="mr-2 text-[12px] min-w-[24px] ">4</label>
          <span className="h-[3px] bg-[#1a1a1a] w-full" />
        </li>
        <li className="flex justify-between items-center mb-1">
          <label className="mr-2 text-[12px] min-w-[24px] ">3</label>
          <span className="h-[3px] bg-[#1a1a1a] w-full" />
        </li>
        <li className="flex justify-between items-center mb-1">
          <label className="mr-2 text-[12px] min-w-[24px] ">2</label>
          <span className="h-[3px] bg-[#1a1a1a] w-full" />
        </li>
        <li className="flex justify-between items-center mb-1">
          <label className="mr-2 text-[12px] min-w-[24px] ">1</label>
          <span className="h-[3px] bg-[#1a1a1a] w-full" />
        </li>
      </ul>
    </div>
  );
};

export default PRODUCT_INFO_RATE;
