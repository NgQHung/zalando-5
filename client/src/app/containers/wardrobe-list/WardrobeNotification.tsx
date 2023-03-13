import React, { memo } from "react";

interface IProps {
  restoreHandler: () => void;
}

const WardrobeNotification = ({ restoreHandler }: IProps) => {
  return (
    <div className="text-[#ffff] flex justify-between max-w-[460px] bg-[#1a1a1a] fixed bottom-0 left-4 z-[1000]">
      <p className=" py-4 pr-4">Předmět odstraněn</p>
      <p onClick={restoreHandler} className="py-4 pr-4 first-letter cursor-pointer ">
        Vrátit
      </p>
    </div>
  );
};

export default memo(WardrobeNotification);
