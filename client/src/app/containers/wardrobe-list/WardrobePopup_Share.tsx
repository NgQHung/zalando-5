import React, { memo } from "react";

interface IProps {
  setShareProduct: (state: boolean) => void;
}

const WardrobePopup_Share = ({ setShareProduct }: IProps) => {
  return (
    <div className="hidden lg:block   ">
      <div className="">
        <div className="fixed left-0 right-0 my-0 bottom-0 border-t z-[10000] bg-[#ffff] h-[72px] border-[#dddd] w-full ">
          <div className=" absolute bottom-0 w-full left-0 right-0 lg:max-w-[1216px]   mx-auto">
            <div className="flex ">
              <div className="shareProduct_title flex flex-col text-[16px] leading-[24px] tracking-[-0.16px] py-3 px-2 mr-auto">
                <span className="font-[400]">Vybrané</span>
                <span>Počet produktů 0</span>
              </div>
              <div className="basis-[16.666%] py-3 px-2">
                <button
                  onClick={() => setShareProduct(false)}
                  className=" text-[16px] leading-[24px] w-full border-2 border-[#1a1a1a] hover:bg-[#1a1a1a] hover:opacity-80 h-full hover:text-[#ffff]"
                >
                  <span className="p-[12px] font-[700] text-center">Zrušit</span>
                </button>
              </div>
              <div className="basis-[16.666%] py-3 px-2">
                <button className=" text-[16px] leading-[24px] w-full bg-[#1a1a1a] h-full opacity-80 hover:bg-[#1a1a1a] hover:opacity-80">
                  <span className=" p-[12px] text-[#ffff] text-center">Sdílet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(WardrobePopup_Share);
