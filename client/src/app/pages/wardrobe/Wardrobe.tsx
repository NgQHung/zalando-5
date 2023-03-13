import React from "react";
import Wrapper from "../../components/UI/wrapper/wrapper";
import WARDROBE_LIKED from "../../containers/wardrobe/Wardrobe_Liked";
import WARDROBE_OWN from "../../containers/wardrobe/Wardrobe_Own";
import WARDROBE_SAVED_SELL from "../../containers/wardrobe/Wardrobe_saved_sell";

const Wardrobe = () => {
  return (
    <Wrapper className="bg-[#efeff0]  ">
      <>
        <div className="wardrobe_title bg-[#ffff] row-full ">
          <div className="ml-6 p-4 lg:max-w-[1216px] relative mx-6 xl:mx-auto lg:my-0 md:my-0  ">
            <h1 className="text-[40px] font-[600] leading-[48px] tracking-[-0.4px]">Vaše předměty</h1>
            <h1>Všechny na jednom místě</h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  py-6 mx-6 mb-6 gap-12 md:gap-0">
          <div className="flex flex-col basis-full min-w-full md:basis-1/2 md:min-w-[50%] gap-2 md:gap-0 ">
            <WARDROBE_LIKED />
            <WARDROBE_OWN />
          </div>
          <div className="flex flex-col basis-1/2 min-w-[50%] gap-2">
            <WARDROBE_SAVED_SELL />
          </div>
        </div>
      </>
    </Wrapper>
  );
};

export default Wardrobe;
