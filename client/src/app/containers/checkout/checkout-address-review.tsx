import React from "react";
import { useNavigate } from "react-router-dom";
import { AddressDelivery } from "../../../interfaces/addressDelivery";
import Wrapper from "../../components/UI/wrapper/wrapper";

interface IProps {
  addressDelivery: AddressDelivery;
}

const CheckoutAddressReview = ({ addressDelivery }: IProps) => {
  const navigate = useNavigate();
  return (
    <Wrapper className="grow">
      <div className="flex tracking-[0.5px] gap-[24px]">
        <div className="flex flex-col gap-[24px] basis-1/2">
          <div className="delivery-address text-[14px]">
            <h2 className="pb-[12px] font-[700] text-[16px] leading-[24px] border-b border-gray-300">
              DORUČOVACÍ ADRESA
            </h2>
            <div className="address-name mt-[24px] mb-[4px]">{addressDelivery?.firstName}</div>
            <div className="address mb-[4px]">{addressDelivery?.address}</div>
            <div className="address mb-[4px]">{addressDelivery?.city}</div>
            <div className="address mb-[4px]">Ceska Republika</div>
          </div>
          <div className="delivery-contact text-[14px]">
            <h2 className="uppercase pb-[12px] font-[700] text-[16px] leading-[24px] border-b border-gray-300">
              Kontaktní údaje
            </h2>
            <p className="flex-wrap mb-[12px] mt-[24px]">
              Prosíme o poskytnutí preferovaného telefonního čísla, na které v den dodání obdržíte zprávu o přibližném
              čase doručení s kontaktními údaji vašeho řidiče.
            </p>
            <p className="mb-[6px]">Číslo mobilního telefonu (Volitelné)</p>
            <input
              placeholder="Enter your phone number"
              type="text"
              className="border border-[#dddd] h-[42px] w-full p-4"
            />
          </div>
        </div>
        <div className="billing-address basis-1/2">
          <h2 className="uppercase pb-[12px] font-[700] text-[16px] leading-[24px] border-b border-gray-300">
            Fakturační adresa
          </h2>
          <p className="my-[24px]">Stejná jako doručovací adresa</p>
          <button
            onClick={() => navigate("/checkout/payment")}
            className="w-full h-[40px] text-[12px] leading-[18px] text-[#ffff] font-[700] uppercase tracking-[0.5px] bg-[#ff4e00]"
          >
            <span>Další</span>
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default CheckoutAddressReview;
