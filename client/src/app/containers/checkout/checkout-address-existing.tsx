import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AddressDelivery } from "../../../interfaces/addressDelivery";
import { checkoutActions } from "../../../stores/checkout-slice";
import { useAppDispatch } from "../../hooks";

interface IProps {
  addressDelivery: AddressDelivery;
  setAdressIsClicked: (state: boolean) => void;
}

const CheckoutAddressExisting = ({ addressDelivery, setAdressIsClicked }: IProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex mt-6 px-[6px] pb-6 border-b border-gray-300 text-[14px] leading-[20px]">
        <div className=" pr-[15px] py-[6px] relative top-1/2 ">
          <div className="border border-[#1a1a1a] w-[26px] h-[26px] rounded-[15px]  top-[0.3px] left-[-5.9px] hover:outline-2px outline_onHover absolute"></div>
          <input defaultChecked={true} className="h-0 w-0" type="radio" />
        </div>
        <div className="pl-9">
          <p>
            {addressDelivery.firstName} {addressDelivery.lastName}
          </p>
          <p>{addressDelivery.address}</p>
          <p>{addressDelivery.city}</p>
          <p>Ceska Republika</p>
        </div>
        <FontAwesomeIcon
          onClick={() => dispatch(checkoutActions.updateAddressDeliveryHandler(true))}
          className="ml-auto cursor-pointer "
          icon={faPen}
        />
      </div>
      <div className="flex mt-6 px-[6px] pb-6 text-[14px] leading-[20px]">
        <div className=" pr-[15px] py-[6px] relative top-1/2 ">
          <div className="border border-[#1a1a1a] w-[26px] h-[26px] rounded-[15px]  top-[0.3px] left-[-5.9px] hover:outline-2px outline_onHover absolute"></div>
          <input className="h-0 w-0" type="radio" />
        </div>
        <div className="pl-9">
          <p>Přidat novou adresu</p>
        </div>
        <FontAwesomeIcon className="ml-auto " icon={faPen} />
      </div>

      <div className="text-center mb-[24px]">
        <button
          onClick={() => setAdressIsClicked(true)}
          className="bg-[#ff4e00] uppercase text-[#ffff] w-full px-6 font-[700] flex-wrap tracking-[0.5px] py-[10px] min-h-[40px] leading-[18px] text-[12px]  "
        >
          Další
        </button>
      </div>
    </>
  );
};

export default CheckoutAddressExisting;
