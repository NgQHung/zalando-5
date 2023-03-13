import { faChevronDown, faChevronUp, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAddressDeliveryById } from "../../../services/apiRequest";
import { checkoutActions } from "../../../stores/checkout-slice";
import { UIActions } from "../../../stores/UI-slice";
import { formatPrice } from "../../../utils/formatPrice";
import { refreshPage } from "../../../utils/refreshPage";
import Wrapper from "../../components/UI/wrapper/wrapper";
import CART_ITEM from "../../containers/cart/Cart_Item";
import { useAppSelector } from "../../hooks";
import "./Cart.css";

const Cart = () => {
  const addedShoppingCart = useAppSelector((state) => state.cartSlice.addedShoppingCart);
  // console.log(addedShoppingCart);
  // console.log("hello");
  const total = useAppSelector((state) => state.cartSlice.total);
  // const [goToCheckout, setGoToCheckout] = useState<boolean>(false)
  const [dropdown, setDropdown] = useState(false);
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);
  // console.log(user);
  const methodPayment = useAppSelector((state) => state.checkoutSlice.methodPayment);

  const freeShipping = total > 100;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    dispatch(UIActions.goToCheckout(true));
    if (!user) {
      navigate("/login");
      return;
    } else {
      navigate("/checkout/address");
    }
  };

  useEffect(() => {
    getAddressDeliveryById(dispatch, user);
  }, [refreshPage]);

  useEffect(() => {
    const data = addedShoppingCart.map((item) => {
      return {
        id: item.id,
        size: item.size,
      };
    });
    dispatch(checkoutActions.purchasedProductsHandler(data));
  }, [addedShoppingCart]);

  return (
    <Wrapper className=" ">
      {addedShoppingCart.length > 0 ? (
        <div className="bg-[#f3f3f3]">
          <div className="flex p-6 gap-6">
            <div className="flex flex-col basis-[68%] gap-3 ">
              <div className="product-cart bg-[#ffff] p-6">
                <div className="product-title text-[24px] leading-[28px] font-[700] pb-[32px]">
                  <span>Váš nákupní košík (Položky: {addedShoppingCart.length})</span>
                </div>
                <p className="text-[12px] leading-[18px] font-[700] pb-[24px]">Balíček doručí ZALANDO</p>
                {addedShoppingCart.map((item, idx) => (
                  <CART_ITEM data={item} key={idx} />
                ))}

                <div className="product-info text-[#2F5FB4] text-[12px] leading-[18px]">
                  <p>
                    <FontAwesomeIcon icon={faCircleInfo} className="mr-[6.4px]" />
                    <span>Cena: „Původně” označuje první uvedenou cenu položky.</span>
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCircleInfo} className="mr-[6.4px]" />

                    <span>Položky v tomto nákupním košíku nejsou rezervovány.</span>
                  </p>
                </div>
              </div>
              <div className="shipping-cart bg-[#ffff] p-6">
                <div className="shipping-title text-[24px] leading-[28px] font-[700] pb-[32px]">
                  Předpokládané doručení
                </div>
                <div className="shipping-date text-[14px] leading-[20px]">Pá, 11.11., 08:00 - 20:00</div>
              </div>
              <div className="payment-cart bg-[#ffff] p-6">
                <div className="payment-title text-[24px] leading-[28px] font-[700] pb-[32px]">Přijímáme</div>
              </div>
            </div>
            <div className="flex flex-col basis-[32%] gap-3">
              <div className="total-cart bg-[#ffff] p-6">
                {!freeShipping ? (
                  <div className="flex py-[18px] px-[12px] bg-[#ebf0f4] text-[#2f5fb4] mb-5">
                    <FontAwesomeIcon className="h-5 w-5 object-cover" icon={faCircleInfo} />
                    <p className="text-[12px] ml-2 leading-[18px]">
                      Pokud je hodnota vašeho nákupního košíku $100 a více, máte nárok na dopravu zdarma.
                    </p>
                  </div>
                ) : null}

                <div className="total-title text-[24px] leading-[28px] font-[700] pb-[32px]">Celkem</div>
                <div className="total-content text-[14px] leading-[20px]">
                  <div className="flex justify-between py-[12px]">
                    <div className="total-subtitle">Mezisoučet</div>
                    <div className="total-value">{formatPrice(total)}</div>
                  </div>
                  <div className="flex justify-between py-[12px]">
                    <div className="total-subtitle">Doprava</div>
                    <div className="total-value">{freeShipping ? "$0,00" : "$4,99"}</div>
                  </div>
                  <div className="flex justify-between py-[12px] text-[14px] leading-[20px] font-[700]">
                    <div className="total-subtitle">Celkem (Vč. DPH)</div>
                    <div className="total-value">{formatPrice(total)}</div>
                  </div>
                  <div className="checkout-cart mt-[24px] grow">
                    <button
                      onClick={checkoutHandler}
                      className="py-[10px] w-full px-[16px] bg-[#FF4E00] text-[#ffff] font-[700] text-[12px]"
                    >
                      <span className=" leading-[18px]">PŘEJÍT K POKLADNĚ</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="sale-code-cart bg-[#ffff] p-6 flex flex-col ">
                <div onClick={() => setDropdown((prev) => !prev)} className="flex justify-between cursor-pointer">
                  <div className="sale-title text-[14px] tracking-[0.5px] leading-[16px]">
                    <span>Vložit slevový kód</span>
                    <span> (Volitelné)</span>
                  </div>
                  <div className="sale-icon">
                    {dropdown ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                  </div>
                </div>
                <div className={"sale-code_dropdown-hidden " + (dropdown ? "sale-code_dropdown-show" : "")}>
                  <div className="sale-dropdown_title mb-[6px] text-[12px] leading-[18px]">Vložte slevový kód zde</div>
                  <div className="sale-dropdown_input">
                    <input className="px-[18px] w-full h-[42px] border border-[#1a1a1a]" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center bg-[#ffff]">
          <div className="h-[160px]">
            <img
              className="h-full w-auto object-cover"
              src="https://thumbs.dreamstime.com/b/empty-shopping-bag-flat-icon-white-blue-isolated-background-eps-file-available-91950822.jpg"
              alt="an empty bag"
            />
          </div>
          <p className="text-[16px] leading-[18px] font-[700] pb-[33px]">Jděte a splňte si své módní sny a touhy.</p>
          <Link to="/">
            <button className="py-[10px] px-[16px] bg-[#FF4E00] text-[#ffff] text-[12px] leading-[18px] font-[700]">
              <span>Pokračovat v nákupu</span>
            </button>
          </Link>
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;
