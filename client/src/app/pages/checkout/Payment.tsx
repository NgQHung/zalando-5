import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPurchasedProducts } from "../../../services/apiRequest";
import { checkoutActions } from "../../../stores/checkout-slice";
import { formatPrice } from "../../../utils/formatPrice";
import Wrapper from "../../components/UI/wrapper/wrapper";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { paymentMethods } from "./data";

const Payment = () => {
  const total = useAppSelector((state) => state.cartSlice.total);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const lastPaymentMethod = useAppSelector((state) => state.checkoutSlice.lastPaymentMethod);
  const methodPayment =
    useAppSelector((state) => state.checkoutSlice.methodPayment) || lastPaymentMethod || "InstantTransfer";
  const [inputValue, setInputValue] = useState(methodPayment);
  const [theLastPurchasedMethodPayment, setTheLastPurchasedMethodPayment] = useState<string>("");
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);

  const InstantTransfer = methodPayment === "InstantTransfer";
  const CreditCard = methodPayment === "CreditCard";
  const PayPal = methodPayment === "PayPal";
  const BankTransfer = methodPayment === "BankTransfer";
  const OnDelivery = methodPayment === "OnDelivery";

  const theLastInstantTransfer = theLastPurchasedMethodPayment === "InstantTransfer";
  const theLastCreditCard = theLastPurchasedMethodPayment === "CreditCard";
  const theLastPayPal = theLastPurchasedMethodPayment === "PayPal";
  const theLastBankTransfer = theLastPurchasedMethodPayment === "BankTransfer";
  const theLastOnDelivery = theLastPurchasedMethodPayment === "OnDelivery";
  const allPurchasedProducts = useAppSelector((state) => state.checkoutSlice.allPurchasedProducts);

  // console.log("methodPayment: ", methodPayment);

  useEffect(() => {
    if (allPurchasedProducts) {
      const theLastIndexPurchase = allPurchasedProducts.length - 1;
      if (theLastIndexPurchase >= 0) {
        setTheLastPurchasedMethodPayment(allPurchasedProducts[theLastIndexPurchase].methodPayment);
      }
    }
  }, []);

  const methodOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.currentTarget.value;
    setInputValue(type);
  };

  const methodPaymentHandler = (typeMethod: string) => {
    dispatch(checkoutActions.methodPaymentHandler(typeMethod));
    setTheLastPurchasedMethodPayment("");
  };

  const confirmHandler = () => {
    // if(!lastPaymentMethod || !inputValue) {
    //    return
    // }
    navigate("/checkout/confirm");
  };

  useEffect(() => {
    setIsChecked(inputValue === methodPayment);
  }, [methodPayment, inputValue]);

  // get purchased products
  useEffect(() => {
    getPurchasedProducts(dispatch, user);
  }, []);

  // console.log("method.type: ", method.type)

  return (
    <Wrapper className="">
      <>
        <div className="flex gap-[24px]">
          <div className="mt-[36px] basis-1/2 max-w-1/2 ml-[8.33333%] px-3">
            <h2 className="uppercase pb-[6px] font-[700] border-b border-gray-300">ZPŮSOB PLATBY</h2>
            <div className="mt-[24px] text-[16px] leading-[24px] relative">
              <ul>
                {paymentMethods.map((method, idx) => (
                  <li key={idx} className={"flex flex-col py-[16px]  "}>
                    <div className={"flex items-center "}>
                      <div className=" pr-[15px] py-[6px] relative top-1/2 ">
                        <div className="border border-[#1a1a1a] w-[26px] h-[26px] rounded-[15px]  top-[5px] left-[-6.8px] hover:outline-2px outline_onHover absolute"></div>
                        <input
                          onChange={methodOnChange}
                          checked={
                            (isChecked && methodPayment === method.type) ||
                            theLastPurchasedMethodPayment === method.type
                          }
                          onClick={() => methodPaymentHandler(method.type)}
                          className="h-0 w-0"
                          type="radio"
                          name={method.type}
                          value={method.type}
                        />
                      </div>
                      <span className="pl-9">{method.title}</span>
                      <div className="ml-auto flex space-x-1">
                        {method.imgUrl ? (
                          <>
                            {method?.imgUrl.map((url, index) => (
                              <img
                                key={index}
                                className="w-[48px] border border-gray-300 rounded-md h-[32px] object-cover"
                                src={url}
                                alt={method.title}
                              />
                            ))}
                          </>
                        ) : null}
                      </div>
                    </div>
                    <div
                      className={
                        "methodDropdown-hidden " +
                        (method.type === methodPayment || theLastPurchasedMethodPayment === method.type
                          ? "methodDropdown-show"
                          : "")
                      }
                    >
                      <div className="">
                        {(InstantTransfer && method.type === methodPayment) ||
                        (theLastPurchasedMethodPayment === method.type && theLastInstantTransfer) ? (
                          <p className="mb-2 mt-6 ml-9">
                            Po potvrzení objednávky budete přesměrováni na stránku GoPay (via Przelewy24), kde budete
                            moci provést přímou platbu převodem ze své banky. V současnosti je služba k dispozici pro
                            klienty České spořitelny, ČSOB, Komerční banky, Raiffeisen Bank, mBank a FIO Bank. Po
                            úspěšném provedení platby bude objednávka dokončena.
                          </p>
                        ) : null}
                        {(CreditCard && method.type === methodPayment) ||
                        (theLastPurchasedMethodPayment === method.type && theLastCreditCard) ? (
                          <div className="mb-2 mt-6 ml-9 space-y-[32px]">
                            <div className=" flex p-4 bg-[#efeff0] text-[14px] leading-[20px] tracking-0 ">
                              <FontAwesomeIcon className="mr-2 h-5 w-5 object-cover" icon={faCircleInfo} />
                              <div>
                                <p className="font-[700] flex-wrap">
                                  Podmínky platby kartou v Evropské unii se změnily.
                                </p>
                                <p className="flex-wrap">
                                  Nyní budete muset při každé platbě online ověřit svoji totožnost. Spojte se se svojí
                                  bankou, abyste si mohli identifikační proces nastavit.
                                </p>
                                <p className="mt-4 cursor-pointer font-[700]">
                                  <span className="pb-1 border-b-[2px] border-[#1a1a1a]">Více informací</span>
                                </p>
                              </div>
                            </div>
                            <div className="">
                              <div className=" pr-[15px] py-[6px] relative top-1/2 ">
                                <div className="border border-[#1a1a1a] w-[26px] h-[26px] rounded-[15px]  top-[5px] left-[-6.8px] hover:outline-2px outline_onHover absolute"></div>
                                <input className="h-0 w-0" defaultChecked={true} type="radio" name="radio" />
                                <span className="pl-9">Nová kreditní nebo debetní karta</span>
                              </div>
                              <div className="mb-2 mt-6 ml-9 space-y-4 text-[14px] leading-[20px] tracking-[0.5px] font-[700]">
                                <div className="space-y-1">
                                  <h4>Držitel karty</h4>
                                  <input
                                    className="p-3 border border-[#1a1a1a] rounded-[3px] w-[300px] h-[40px]"
                                    type="text"
                                    name=""
                                    id=""
                                  />
                                </div>
                                <div className="space-y-1">
                                  <h4>Číslo karty</h4>
                                  <input
                                    className="p-3 border border-[#1a1a1a] rounded-[3px] w-[300px] h-[40px]"
                                    type="text"
                                    name=""
                                    id=""
                                  />
                                </div>
                                <div className="space-y-1">
                                  <h4>Datum platnosti</h4>
                                  <input
                                    className="p-3 border border-[#1a1a1a] rounded-[3px] w-[100px] h-[40px]"
                                    type="text"
                                    name=""
                                    id=""
                                  />
                                </div>
                                <div className="space-y-1">
                                  <h4>Bezpečnostní kód</h4>
                                  <input
                                    className="p-3 border border-[#1a1a1a] rounded-[3px] w-[100px] h-[40px]"
                                    type="text"
                                    name=""
                                    id=""
                                  />
                                </div>
                                <div className=" pr-[15px] py-[6px] relative top-1/2 flex items-center">
                                  <div className="border border-[#1a1a1a] w-[26px] h-[26px] rounded-[15px]  top-0 left-[-0.8px] hover:outline-2px outline_onHover absolute"></div>
                                  <input className="h-0 w-0 " type="radio" name="radio" />
                                  <span className="pl-9 font-normal">
                                    Ukládejte bezpečně své platební údaje pro budoucí nákupy
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {(PayPal && method.type === methodPayment) ||
                        (theLastPurchasedMethodPayment === method.type && theLastPayPal) ? (
                          <p className="mb-2 mt-6 ml-9">
                            Budete přesměrováni přímo na službu PayPal, kde budete moci platbu dokončit.
                          </p>
                        ) : null}
                        {(BankTransfer && method.type === methodPayment) ||
                        (theLastPurchasedMethodPayment === method.type && theLastBankTransfer) ? (
                          <p className="mb-2 mt-6 ml-9">
                            Po vytvoření objednávky vám zašleme instrukce, jak peníze převést bankovním převodem na náš
                            účet. Objednané produkty vám můžeme rezervovat jen po dobu 7 dnů, tak prosím neváhejte. Čím
                            dříve obdržíme vaši platbu, tím dříve budeme moci vaši zásilku odeslat.
                          </p>
                        ) : null}
                        {(OnDelivery && method.type === methodPayment) ||
                        (theLastPurchasedMethodPayment === method.type && theLastOnDelivery) ? (
                          <p className="mb-2 mt-6 ml-9">
                            V současné době se všichni snažíme omezit přímý osobní kontakt, proto vás prosíme, abyste
                            pokud možno zvolili jednu z bezkontaktních platebních metod. Pokud se přeci jen rozhodnete
                            pro dobírku, připravte prosím pro kurýra hotovost přesně.
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-[36px] basis-1/3 max-w-1/3 px-3">
            <Link to="/checkout/confirm">
              <h2 className="uppercase pb-[6px] font-[700] border-b border-gray-300">POUKAZ (Volitelné)</h2>
            </Link>
            <div className="mt-[24px] text-[14px] leading-[20px] tracking-[0.5px]">
              <p className="mb-6">
                Slevový poukaz: vyberte požadovaný způsob platby a zadejte číslo slevového poukazu v následujícím kroku
              </p>
              <p>
                Dárkový poukaz: Je-li hodnota dárkového poukazu vyšší nebo rovna celkové ceně objednávky, tento krok
                přeskočte výběrem jakéhokoliv typu platby a číslo dárkového poukazu zadejte na následující stránce
              </p>
              <div className="mt-[36px] py-4 bg-gray-100 font-[700] text-[16px] leading-[17px]">
                <div className="flex uppercase justify-between items-center p-2 m-4 border-b border-gray-300 mb-[12px]">
                  <p>Doprava</p>
                  <p>Zdarma</p>
                </div>
                <div className="flex uppercase justify-between items-center p-2 m-4 mb-[12px]">
                  <p>
                    Celkem <span className="text-gray-500 font-medium text-[14px] leading-[16px]">(Vč. DPH)</span>
                  </p>
                  <p>{formatPrice(total)}</p>
                </div>
                <div className="text-center mx-6 mb-[24px]">
                  <button
                    onClick={confirmHandler}
                    className="bg-[#ff4e00] text-[#ffff] w-full px-6 font-[700] flex-wrap tracking-[0.5px] py-[10px] min-h-[40px] leading-[18px] text-[12px]  "
                  >
                    Další
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Wrapper>
  );
};

export default Payment;
