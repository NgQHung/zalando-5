import { faChevronDown, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  FOOTER_INFO_1,
  FOOTER_INFO_2,
  FOOTER_INFO_3,
  FOOTER_INFO_4,
} from "../../../../../utils/data/footer/footerInfo";
import ready from "../../../../../utils/intersectionObserver";
import ErrorFallback from "../../../../components/ErrorBoundary";
import Loader from "../../../../components/UI/loader/Loader";
import Container from "../../../container";
import "./FooterInfo.css";

// interface IType {
//   contact: string;
//   discount: string;
//   about: string;
//   logist: string;
//   payment: string;
//   cons: string;
//   service: string;
// }

const FooterInfo = () => {
  const [type, setType] = React.useState<Record<string, any>>({
    contact: "",
    discount: "",
    about: "",
    logist: "",
    payment: "",
    cons: "",
    service: "",
  });

  const onClickMobileHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name } = e.currentTarget;
    if (type[name] === name) {
      setType((prev) => ({ ...prev, [name]: "" }));
    } else {
      setType((prev) => ({ ...prev, [name]: name }));
    }
  };

  const contactCondition = type.contact === "contact";
  const discountCondition = type.discount === "discount";
  const aboutCondition = type.about === "about";
  const logistCondition = type.logist === "logist";
  const paymentCondition = type.payment === "payment";
  const consCondition = type.cons === "cons";
  const serviceCondition = type.service === "service";

  return (
    <Fragment>
      <Container bg_color="bg-[#6328e0]">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <Suspense
            fallback={
              <>
                <Loader />
                {React.useEffect(() => {
                  let subscribe = true;
                  if (subscribe) {
                    ready();
                  }
                  return () => {
                    subscribe = false;
                  };
                })}
              </>
            }
          ></Suspense>
        </ErrorBoundary>
        {/* screen start */}
        <div className="hidden md:block">
          <div className="text-[#ffff] text-[14px] mt-[36px] flex flex-wrap w-full  ">
            {/* first start */}
            <div className=" md:basis-2/3 md:max-w-2/3 lg:basis-1/2 lg:max-w-1/2 pl-8 pb-[36px] ">
              <h2 className="mb-4 text_tiempos pl-3 text-[22px] leading-[28px] font-[400] grow tracking-[-0.22px]">
                Nápověda a kontakt
              </h2>
              <p className="px-2 font-[700] mb-2">Všechny dotazy</p>
              <div className="flex">
                <ul className="basis-1/2 max-w-1/2 space-y-3 px-2">
                  <li>
                    <span className="affect_text">Sledovat objednávku</span>
                  </li>
                  <li>
                    <span className="affect_text">Podmínky dopravy</span>
                  </li>
                  <li>
                    <span className="affect_text">Jaké způsoby platby nabízíte?</span>
                  </li>
                  <li>
                    <span className="affect_text">Přihlašte se k odběru newsletteru</span>
                  </li>
                </ul>
                <ul className="basis-1/2 max-w-1/2 space-y-3 px-2">
                  <li>
                    <span className="affect_text">Vrácení objednávky</span>
                  </li>
                  <li>
                    <span className="affect_text">Kdy budu mít peníze zpět?</span>
                  </li>
                  <li>
                    <span className="affect_text">Mohu zboží vyměnit?</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* first end */}
            {/* second start */}
            <div className="flex md:basis-1/3 md:max-w-1/3 lg:basis-1/4 lg:max-w-1/4 pl-8 pb-[36px]">
              <div className="basis-1/2 max-w-1/2 grow">
                <h2 className="mb-4 text_tiempos pl-3 text-[22px] leading-[28px] font-[400]  grow tracking-[-0.22px]">
                  Poukazy a slevy
                </h2>
                <ul className="space-y-3 px-2">
                  {FOOTER_INFO_1.data.map((item, idx) => (
                    <li key={idx} className="">
                      <span className="affect_text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* second end */}
            {/* third start */}
            <div className="flex md:basis-1/3 md:max-w-1/3 lg:basis-1/4 lg:max-w-1/4 pl-8 pb-[36px]">
              <div className="basis-1/2 max-w-1/2 grow">
                <h2 className="mb-4 text_tiempos pl-3 text-[22px] leading-[28px] font-[400] grow tracking-[-0.22px]">
                  O Zalandu
                </h2>
                <ul className="space-y-3 px-2">
                  {FOOTER_INFO_2.data.map((item, idx) => (
                    <li key={idx} className="">
                      <span className="affect_text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* third end */}
            {/* forth start */}
            <div className="flex md:basis-1/3 md:max-w-1/3 lg:basis-1/4 lg:max-w-1/4 pl-8 pb-[36px]">
              <div className="basis-1/2 max-w-1/2 grow">
                <h2 className="mb-4 text_tiempos pl-3 text-[22px] leading-[28px] font-[400] grow tracking-[-0.22px]">
                  Logističtí partneři
                </h2>
                <ul className="flex flex-wrap">
                  <li className="shrink-0 mr-2 mb-3 w-[48px] h-[32px]">
                    <img
                      className="img-topi h-full w-full
                      c h-full w-full object-cover rounded-md"
                      src="Skeleton-img.png"
                      lazy-src="https://banner2.cleanpng.com/20180515/kke/kisspng-dhl-express-logistics-freight-forwarding-agency-in-5afacf2232c924.124881091526386466208.jpg"
                      alt="DHL"
                    />
                  </li>
                  <li className="shrink-0 mr-2 mb-3 w-[48px] h-[32px]">
                    <img
                      className="img-topi h-full w-full
                      c h-full w-full object-cover rounded-md"
                      src="Skeleton-img.png"
                      lazy-src="https://www.zaspas.cz/wp-content/uploads/2016/04/Logo-ppl-1024x333.jpg"
                      alt="PPL"
                    />
                  </li>
                  <li className="shrink-0 mr-2 mb-3 w-[48px] h-[32px]">
                    <img
                      className="img-topi h-full w-full
                      c h-full w-full object-cover rounded-md"
                      src="Skeleton-img.png"
                      lazy-src="https://zlin.cz/wp-content/uploads/2020/08/Zakladni_dvoubarevna_varianta-768x512.jpg"
                      alt="CP"
                    />
                  </li>
                  <li className="shrink-0 mr-2 mb-3 w-[48px] h-[32px]">
                    <img
                      className="img-topi h-full w-full
                      c h-full w-full object-cover rounded-md"
                      src="Skeleton-img.png"
                      lazy-src="https://upload.wikimedia.org/wikipedia/commons/5/50/Zasilkovna_logo.png"
                      alt="zasilkovna"
                    />
                  </li>
                </ul>
              </div>
            </div>
            {/* forth end */}
            {/* fifth start */}
            <div className="flex md:basis-1/3 md:max-w-1/3 lg:basis-1/4 lg:max-w-1/4 pl-8 pb-[36px]">
              <div className="basis-1/2 max-w-1/2 grow">
                <h2 className="mb-4 text_tiempos pl-3 text-[22px] leading-[28px] font-[400] grow tracking-[-0.22px]">
                  Způsoby platby
                </h2>
                <ul className="flex flex-wrap ">
                  <li className="shrink-0 mr-2 mb-3 w-[48px] h-[32px] ">
                    <img
                      className="img-lazy h-full w-full
                       object-cover rounded-md"
                      src="Skeleton-img.png"
                      lazy-src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg"
                      alt="visa"
                    />
                  </li>
                  <li className="shrink-0 mr-2 mb-3 w-[48px] h-[32px] ">
                    <img
                      className="img-lazy h-full w-full
                       object-cover rounded-md"
                      src="Skeleton-img.png"
                      lazy-src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                      alt="mastercard"
                    />
                  </li>
                  <li className="shrink-0 mr-2 mb-3 w-[48px] h-[32px] ">
                    <img
                      className="img-lazy h-full w-full
                       object-cover rounded-md"
                      src="Skeleton-img.png"
                      lazy-src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404__480.png"
                      alt="paypal"
                    />
                  </li>
                  <li className="shrink-0 mr-2 mb-3 w-[48px] h-[32px] ">
                    <img
                      className="img-lazy h-full w-full
                       object-cover rounded-md"
                      src="Skeleton-img.png"
                      lazy-src="https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/product/images/img-WEBLOGO1-01.jpg"
                      alt="AMX"
                    />
                  </li>
                </ul>
              </div>
            </div>
            {/* fifth end */}
            {/* sixth start */}
            <div className="flex md:basis-1/3 md:max-w-1/3 lg:basis-1/4 lg:max-w-1/4 pl-8 pb-[36px]">
              <div className="basis-1/2 max-w-1/2 grow">
                <h2 className="mb-4 text_tiempos pl-3 text-[22px] leading-[28px] font-[400] grow tracking-[-0.22px]">
                  Naše výhody
                </h2>
                <ul className="space-y-3 px-2">
                  {FOOTER_INFO_3.data.map((item, idx) => (
                    <li key={idx}>
                      <span className="affect_text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* sixth end */}
            {/* seventh start */}
            <div className="flex md:basis-1/3 md:max-w-1/3 lg:basis-1/4 lg:max-w-1/4 pl-8 pb-[36px]">
              <div className="basis-1/2 max-w-1/2 grow">
                <h2 className="mb-4 text_tiempos pl-3 text-[22px] leading-[28px] font-[400] grow tracking-[-0.22px]">
                  Naše služby
                </h2>
                <ul className="space-y-3 px-2">
                  {FOOTER_INFO_4.data.map((item, idx) => (
                    <li key={idx}>
                      <span className="affect_text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* seventh end */}
          </div>
        </div>
        {/* screen end */}
      </Container>
      {/* <Container bg_color=""> */}
      {/* mobile start */}
      <div className="md:hidden w-full ">
        <div className="flex flex-col  ">
          {/* first start */}
          <div className="border-b border-[#dcdcde]">
            <button name="contact" onClick={onClickMobileHandler} className="py-4 flex w-full bg-[#efeff0]">
              <FontAwesomeIcon icon={faCircleQuestion} className="h-6 object-cover ml-[30px] " />
              <span className="pl-4 grow text-left text-[16px] leading-6 ">Nápověda a kontakt</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={"normal_state ml-auto h-6 object-cover mr-6 " + (contactCondition ? "rotate_state" : "")}
              />
            </button>
            <ul
              className={
                "footerInfo_dropdown_hidden bg-[#efeff0] px-6 text-[14px] " +
                (contactCondition ? "footerInfo_dropdown" : "")
              }
            >
              <p className="pl-[6px] font-[700] mb-3">Všechny dotazy</p>
              <li className="mb-3 pl-[6px]">
                <span className="affect_text">Sledovat objednávku</span>
              </li>
              <li className="mb-3 pl-[6px]">
                <span className="affect_text">Podmínky dopravy</span>
              </li>
              <li className="mb-3 pl-[6px]">
                <span className="affect_text">Jaké způsoby platby nabízíte?</span>
              </li>
              <li className="mb-3 pl-[6px]">
                <span className="affect_text">Přihlašte se k odběru newsletteru</span>
              </li>
              <li className="mb-3 pl-[6px]">
                <span className="affect_text">Vrácení objednávky</span>
              </li>
              <li className="mb-3 pl-[6px]">
                <span className="affect_text">Kdy budu mít peníze zpět?</span>
              </li>
              <li className="mb-3 pl-[6px]">
                <span className="affect_text">Mohu zboží vyměnit?</span>
              </li>
            </ul>
          </div>
          {/* first end */}
          {/* second start */}
          <div className="border-b border-[#dcdcde]">
            <button name="discount" onClick={onClickMobileHandler} className="py-4 flex w-full bg-[#efeff0]">
              <FontAwesomeIcon icon={faCircleQuestion} className="h-6 object-cover ml-[30px] " />
              <span className="pl-4 grow text-left text-[16px] leading-6 ">Poukazy a slevy</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={"normal_state ml-auto h-6 object-cover mr-6 " + (discountCondition ? "rotate_state" : "")}
              />
            </button>
            <ul
              className={
                "footerInfo_dropdown_hidden bg-[#efeff0] px-6 text-[14px] " +
                (discountCondition ? "footerInfo_dropdown" : "")
              }
            >
              {FOOTER_INFO_1.data.map((item, idx) => (
                <li key={idx} className="mb-3 pl-[6px]">
                  <span className="affect_text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* second end */}
          {/* third start */}
          <div className="border-b border-[#dcdcde]">
            <button name="about" onClick={onClickMobileHandler} className="py-4 flex w-full bg-[#efeff0]">
              <FontAwesomeIcon icon={faCircleQuestion} className="h-6 object-cover ml-[30px] " />
              <span className="pl-4 grow text-left text-[16px] leading-6 ">O Zalandu</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={"normal_state ml-auto h-6 object-cover mr-6 " + (aboutCondition ? "rotate_state" : "")}
              />
            </button>
            <ul
              className={
                "footerInfo_dropdown_hidden bg-[#efeff0] px-6 text-[14px] " +
                (aboutCondition ? "footerInfo_dropdown" : "")
              }
            >
              {FOOTER_INFO_2.data.map((item, idx) => (
                <li key={idx} className="mb-3 pl-[6px]">
                  <span className="affect_text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* third end */}
          {/* forth start */}
          <div className="border-b border-[#dcdcde]">
            <button name="logist" onClick={onClickMobileHandler} className="py-4 flex w-full bg-[#efeff0]">
              <FontAwesomeIcon icon={faCircleQuestion} className="h-6 object-cover ml-[30px] " />
              <span className="pl-4 grow text-left text-[16px] leading-6 ">Logističtí partneři</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={"normal_state ml-auto h-6 object-cover mr-6 " + (logistCondition ? "rotate_state" : "")}
              />
            </button>
            <ul
              className={
                "footerInfo_dropdown_hidden bg-[#efeff0] px-6 text-[14px] flex flex-wrap " +
                (logistCondition ? "footerInfo_dropdown" : "")
              }
            >
              <li className="w-[48px] h-[32px]  shrink-0  mb-3 pl-[6px] mr-2">
                <img
                  className=" object-cover border border-[#dcdcde] rounded-md"
                  src="Skeleton-img.png"
                  lazy-src="https://banner2.cleanpng.com/20180515/kke/kisspng-dhl-express-logistics-freight-forwarding-agency-in-5afacf2232c924.124881091526386466208.jpg"
                  alt="DHL"
                />
              </li>
              <li className="w-[48px] h-[32px] shrink-0  mb-3 pl-[6px] mr-2">
                <img
                  className=" object-cover border border-[#dcdcde] rounded-md"
                  src="Skeleton-img.png"
                  lazy-src="https://www.zaspas.cz/wp-content/uploads/2016/04/Logo-ppl-1024x333.jpg"
                  alt="PPL"
                />
              </li>
              <li className="w-[48px] h-[32px] shrink-0  mb-3 pl-[6px] mr-2">
                <img
                  className=" object-cover border border-[#dcdcde] rounded-md"
                  src="Skeleton-img.png"
                  lazy-src="https://zlin.cz/wp-content/uploads/2020/08/Zakladni_dvoubarevna_varianta-768x512.jpg"
                  alt="CP"
                />
              </li>
              <li className="w-[48px] h-[32px] shrink-0  mb-3 pl-[6px] mr-2">
                <img
                  className=" object-cover border border-[#dcdcde] rounded-md"
                  src="Skeleton-img.png"
                  lazy-src="https://upload.wikimedia.org/wikipedia/commons/5/50/Zasilkovna_logo.png"
                  alt="zasilkovna"
                />
              </li>
            </ul>
          </div>
          {/* forth end */}

          {/* fifth start */}
          <div className="border-b border-[#dcdcde]">
            <button name="payment" onClick={onClickMobileHandler} className="py-4 flex w-full bg-[#efeff0]">
              <FontAwesomeIcon icon={faCircleQuestion} className="h-6 object-cover ml-[30px] " />
              <span className="pl-4 grow text-left text-[16px] leading-6 ">Způsoby platby</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={"normal_state ml-auto h-6 object-cover mr-6 " + (paymentCondition ? "rotate_state" : "")}
              />
            </button>
            <ul
              className={
                "footerInfo_dropdown_hidden bg-[#efeff0] px-6 text-[14px] flex flex-wrap " +
                (paymentCondition ? "footerInfo_dropdown" : "")
              }
            >
              <li className="w-[48px] h-[32px] shrink-0  mb-3 pl-[6px] mr-2  ">
                <img
                  className=" object-cover border border-[#dcdcde] rounded-md"
                  src="Skeleton-img.png"
                  lazy-src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg"
                  alt="visa"
                />
              </li>
              <li className="w-[48px] h-[32px] shrink-0  mb-3 pl-[6px] mr-2">
                <img
                  className=" object-cover border border-[#dcdcde] rounded-md"
                  src="Skeleton-img.png"
                  lazy-src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                  alt="mastercard"
                />
              </li>
              <li className="w-[48px] h-[32px] shrink-0  mb-3 pl-[6px] mr-2">
                <img
                  className=" object-cover border border-[#dcdcde] rounded-md"
                  src="Skeleton-img.png"
                  lazy-src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404__480.png"
                  alt="paypal"
                />
              </li>
              <li className="w-[48px] h-[32px] shrink-0  mb-3 pl-[6px] mr-2">
                <img
                  className=" object-cover border border-[#dcdcde] rounded-md"
                  src="Skeleton-img.png"
                  lazy-src="https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/product/images/img-WEBLOGO1-01.jpg"
                  alt="AMX"
                />
              </li>
            </ul>
          </div>
          {/* fifth end */}

          {/* sixth start */}
          <div className="border-b border-[#dcdcde]">
            <button name="cons" onClick={onClickMobileHandler} className="py-4 flex w-full bg-[#efeff0]">
              <FontAwesomeIcon icon={faCircleQuestion} className="h-6 object-cover ml-[30px] " />
              <span className="pl-4 grow text-left text-[16px] leading-6 ">Naše výhody</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={"normal_state ml-auto h-6 object-cover mr-6 " + (consCondition ? "rotate_state" : "")}
              />
            </button>
            <ul
              className={
                "footerInfo_dropdown_hidden bg-[#efeff0] px-6 text-[14px] " +
                (consCondition ? "footerInfo_dropdown" : "")
              }
            >
              {FOOTER_INFO_3.data.map((item, idx) => (
                <li key={idx} className="mb-3 pl-[6px]">
                  <span className="affect_text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* sixth end */}
          {/* seventh start */}
          <div className="border-b border-[#dcdcde]">
            <button name="service" onClick={onClickMobileHandler} className="py-4 flex w-full bg-[#efeff0]">
              <FontAwesomeIcon icon={faCircleQuestion} className="h-6 object-cover ml-[30px] " />
              <span className="pl-4 grow text-left text-[16px] leading-6 ">Naše služby</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={"normal_state ml-auto h-6 object-cover mr-6 " + (serviceCondition ? "rotate_state" : "")}
              />
            </button>
            <ul
              className={
                "footerInfo_dropdown_hidden bg-[#efeff0] px-6 text-[14px] " +
                (serviceCondition ? "footerInfo_dropdown" : "")
              }
            >
              {FOOTER_INFO_2.data.map((item, idx) => (
                <li key={idx} className="mb-3 pl-[6px]">
                  <span className="affect_text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* seventh end */}
        </div>
      </div>
      {/* mobile end */}
      {/* </Container> */}
    </Fragment>
  );
};

export default FooterInfo;
