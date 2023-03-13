import React from "react";

interface IProps {
  bg_color_header: boolean;
}

const HEADER_BASIC_INFO = ({ bg_color_header }: IProps) => {
  return (
    <div className=" hidden lg:block ">
      <div
        className={
          " text-[12px] text-[#666666]   font-[700] transition-colors duration-[1.5s] " +
          (bg_color_header ? "bg-[#cac9c9]" : "bg-[#efeff0]")
        }
      >
        <div className="flex justify-between h-[32px]  items-center mx-6 xl:mx-auto xl:my-0 lg:max-w-[1216px] lg:min-w-[943px]">
          <span className="">Nápověda a kontakt</span>
          <span className="">DOPRAVA A VRÁCENÍ ZDARMA*</span>
          <span className="">Vrácení zboží do 100 dní</span>
        </div>
      </div>
    </div>
  );
};

export default HEADER_BASIC_INFO;
