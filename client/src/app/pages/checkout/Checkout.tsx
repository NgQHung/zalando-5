import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutAddressForm from "../../containers/checkout/checkout-address-form";
import { useAppDispatch, useAppSelector } from "../../hooks";
import CheckoutAddressExisting from "../../containers/checkout/checkout-address-existing";
import CheckoutAddressSelect from "../../containers/checkout/checkout-address-select";
import CheckoutAddressReview from "../../containers/checkout/checkout-address-review";
import { refreshPage } from "../../../utils/refreshPage";
import { getAddressDeliveryById } from "../../../services/apiRequest";

const Checkout = () => {
  const [addressIsClicked, setAdressIsClicked] = useState(false);
  const addressDelivery = useAppSelector((state) => state.checkoutSlice.addressDelivery);
  const isUpdateAddressDelivery = useAppSelector((state) => state.checkoutSlice.updateAddressDelivery);
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);
  const goToCheckoutState = useAppSelector((state) => state.UISlice.goToCheckout);
  const selectedTypeDelivery = useAppSelector((state) => state.UISlice.selectedTypeDelivery);
  const openAddressForm = useAppSelector((state) => state.UISlice.openAddressForm);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAddressDeliveryById(dispatch, user);
    if (addressDelivery && goToCheckoutState) {
      navigate("/checkout/confirm");
    }
  }, [refreshPage]);
  // console.log("goToCheckoutState", goToCheckoutState);
  // console.log("addressDelivery", addressDelivery);
  // console.log("openAddressForm", openAddressForm);
  // const navigate = useNavigate();

  return (
    <>
      {addressIsClicked ? (
        <CheckoutAddressReview addressDelivery={addressDelivery!} />
      ) : (
        <div className="delivery flex flex-col max-w-4/5 basis-4/5 ">
          <CheckoutAddressSelect />
          <div
            className={
              "deliveryDropdown-hidden " +
              (selectedTypeDelivery === "myAddress" || openAddressForm ? "deliveryDropdown-show" : "")
            }
          >
            {addressDelivery && !openAddressForm && selectedTypeDelivery === "myAddress" ? (
              <CheckoutAddressExisting addressDelivery={addressDelivery} setAdressIsClicked={setAdressIsClicked} />
            ) : (
              <CheckoutAddressForm setAdressIsClicked={setAdressIsClicked} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
