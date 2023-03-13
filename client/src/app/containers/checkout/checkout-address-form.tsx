import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AddressDelivery } from "../../../interfaces/addressDelivery";
// import { User } from "../../../interfaces/user";
import { postAddressDelivery } from "../../../services/apiRequest";
import { checkoutActions } from "../../../stores/checkout-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Use_Input from "../../hooks/use-input";

const inputIsValid = (value: string) => value.trim() !== "";

interface IProps {
  setAdressIsClicked: (state: boolean) => void;
  // user: User | null;
  // addressDelivery: AddressDelivery | null
}

const CheckoutAddressForm = ({ setAdressIsClicked }: IProps) => {
  const {
    onChangeHandler: firstNameOnChange,
    input: firstNameInput,
    hasError: firstNameHasError,
  } = Use_Input(inputIsValid);
  const {
    onChangeHandler: lastNameOnChange,
    input: lastNameInput,
    hasError: lastNameHasError,
  } = Use_Input(inputIsValid);
  const { onChangeHandler: addressOnChange, input: addressInput, hasError: addressHasError } = Use_Input(inputIsValid);
  const { onChangeHandler: infoOnChange, input: infoInput, hasError: infoHasError } = Use_Input(inputIsValid);
  const { onChangeHandler: pscOnChange, input: pscInput, hasError: pscHasError } = Use_Input(inputIsValid);
  const { onChangeHandler: cityOnChange, input: cityInput, hasError: cityHasError } = Use_Input(inputIsValid);
  const addressDelivery = useAppSelector((state) => state.checkoutSlice.addressDelivery);
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);
  const inputChange = () => {};
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      firstName: firstNameInput ? firstNameInput : user?.firstName ? user?.firstName : addressDelivery?.firstName,
      lastName: lastNameInput ? lastNameInput : addressDelivery?.lastName,
      address: addressInput ? addressInput : addressDelivery?.address,
      info: infoInput ? infoInput : addressDelivery?.info,
      psc: pscInput ? pscInput : addressDelivery?.psc,
      city: cityInput ? cityInput : addressDelivery?.city,
    };
    if (!user) {
      navigate("/login");
      return;
    }
    postAddressDelivery(dispatch, user, data);
    dispatch(checkoutActions.addressDeliveryHandler(data));

    setAdressIsClicked(true);
  };

  return (
    <div>
      <div className="flex text-[14px] leading-[20px] ">
        <div className=" pr-[15px] py-[6px] relative top-1/2 ml-[7px]">
          <div className="border border-[#1a1a1a] w-[26px] h-[26px] rounded-[15px] top-0 left-[-6.7px] hover:outline-2px outline_onHover absolute"></div>
          <input checked={true} onChange={inputChange} className="h-0 w-0" type="radio" />
        </div>
        <p className="ml-[50px]">Upravit adresu</p>
      </div>

      <input className="switch " type="checkbox" id="switch" />
      <label htmlFor="switch" className="switch-text ml-[80px] mb-[30px]">
        Toggle
      </label>

      <form onSubmit={submitHandler} className="text-[12px] leading-[18px] space-y-[18px] ml-[80px]">
        <div>
          <p className="mb-[6px]">Křestní jméno*</p>
          <input
            onChange={firstNameOnChange}
            defaultValue={addressDelivery?.firstName ? addressDelivery?.firstName : user?.firstName}
            // value={firstNameInput}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] "}
          />
        </div>
        <div>
          <p className="mb-[6px]">Příjmení*</p>
          <input
            onChange={lastNameOnChange}
            defaultValue={addressDelivery?.lastName}
            // value={lastNameInput}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] " + (lastNameInput ? "" : "opacity-30")}
          />
        </div>
        <div>
          <p className="mb-[6px]">Adresa*</p>
          <input
            onChange={addressOnChange}
            defaultValue={addressDelivery?.address}
            // value={addressInput}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] " + (addressInput ? "" : "opacity-30")}
          />
        </div>
        <div>
          <p className="mb-[6px]">Dodatečné informace pro doručení, max. 30 znaků (Volitelné)</p>
          <input
            onChange={infoOnChange}
            defaultValue={addressDelivery?.info}
            // value={infoInput}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] " + (infoInput ? "" : "opacity-30")}
          />
        </div>
        <div>
          <p className="mb-[6px]">PSČ*</p>
          <input
            onChange={pscOnChange}
            defaultValue={addressDelivery?.psc}
            // value={pscInput}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] " + (pscInput ? "" : "opacity-30")}
          />
        </div>
        <div>
          <p className="mb-[6px]">Město*</p>
          <input
            onChange={cityOnChange}
            defaultValue={addressDelivery?.city}
            // value={cityInput}
            type="text"
            className={"outline_onHover  w-full h-[42px] px-[18px] " + (cityInput ? "" : "opacity-30")}
          />
        </div>

        {/* ))} */}

        <p className="text-[16px] leading-[17.6px] font-[700]">Česká republika</p>
        <button
          // onClick={() => navigate("/checkout/done")}
          className=" border-2 effect_bg-orange border-[#ff4e00] text-[#ff4e00] text-[#ffff] font-[700] flex-wrap tracking-[0.5px] py-[10px] px-[16px] min-h-[40px] leading-[18px] text-[12px] uppercase w-full "
        >
          Uložit
        </button>
      </form>
    </div>
  );
};

export default CheckoutAddressForm;
