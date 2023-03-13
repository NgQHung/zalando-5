import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { UIActions } from "../../../stores/UI-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const CheckoutAddressSelect = () => {
  const selectedTypeDelivery = useAppSelector((state) => state.UISlice.selectedTypeDelivery);
  const dispatch = useAppDispatch();
  const typeDeliveryHandler = () => {
    dispatch(UIActions.selectedTypeDelivery("myAddress"));
  };

  return (
    <>
      <div className="delivery-title grow pb-2 border-b border-gray-300 text-left text-[16px] leading-[24px] tracking-[0.5px] font-[700]">
        DORUČOVACÍ ADRESA
      </div>
      <div className="delivery-content w-full flex gap-[24px] py-[24px]">
        <div className="delivery-point md:min-w-[300px] cursor-pointer h-[100px] grow flex justify-center items-center border border-gray-300 ">
          <span>Výdejní místo</span>
        </div>
        <div
          onClick={typeDeliveryHandler}
          className={
            "my-address cursor-pointer md:min-w-[300px]  h-[100px] grow flex flex-col justify-center items-center border border-gray-300 text-[12px] leading-[14px] " +
            (selectedTypeDelivery === "myAddress" ? "text-[#ff4e00] border-b-2 border-b-[#ff4e00]" : "")
          }
        >
          <FontAwesomeIcon className={"h-10 w-10 object-cover "} icon={faHouse} />
          <span>Moje adresa</span>
        </div>
      </div>
      {/* <div className="hidden"> */}
      {/* <p className="delivery-info text-left text-[14px] leading-[20px] tracking-[0.5px]">
            <span>
              Nechte si dodat své zboží domů nebo je zaslat na nedaleké výdejní místo, kde si jej můžete vyzvednout, kdy
              se vám to bude hodit.
            </span>
          </p> */}
    </>
  );
};

export default CheckoutAddressSelect;
