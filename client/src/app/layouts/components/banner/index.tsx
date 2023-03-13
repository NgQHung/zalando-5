import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DATA_BANNER } from "../../../../utils/data/footer/footerBanner";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Container from "../../container";
import "./Banner.css";

const Banner = () => {
  const [isClicked, setIsClicked] = React.useState(false);

  const [typeInput, setTypeInput] = React.useState("");
  const [isClick, setIsClick] = React.useState(false);

  const onClickHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setIsClick(true);
    setTypeInput(e.currentTarget.name);
  };

  let refInput = React.useRef<any>(null);

  useOnClickOutside(refInput, () => setIsClick(false));

  return (
    <Container bg_color="bg-[#efeff0]" margin="my-16">
      <div className="flex w-full pt-6 transition-transform flex-col md:flex-row flex-wrap md:flex-nowrap px-[18px] ">
        <div className=" md:w-1/2 flex flex-col pb-6">
          <h3 className="text-[18px] md:text-[24px] font-[600]">Co takhle sleva 10 % na váš příští nákup?</h3>
          <h3 className="text-[18px] md:text-[24px] text_tiempos ">Dostávejte novinky od Zalando.cz e-mailem</h3>
          <p className="text-[16px] leading-[21px] h-[21px] text_tiempos mt-4">
            Přihlaste se, abyste měli přehled o nejnovějších nabídkách.
          </p>
        </div>
        <div className=" md:w-1/2">
          <div className="bg-[#ffff] py-6 px-6 lg:px-16 w-full ">
            <div className="flex flex-col">
              <p
                ref={refInput}
                className={
                  "py-1 px-2 border-t border-l border-r border-[#1a1a1a] text-[14px] self-start " +
                  (isClick && typeInput === "email" ? "bg-[#1a1a1a] text-[#ffff] " : "")
                }
              >
                Vaše e-mailová adresa
              </p>
              <input
                className="py-[10px] px-[12px] border border-[#1a1a1a] mb-6 w-full leading-11 outline-none"
                type="text"
                onClick={onClickHandler}
                name="email"
                placeholder="Hunghunghung273@gmail.com"
              />
              <div className="flex w-full">
                <div className="w-1/2">
                  <h3 className="font-[700] leading-6">Upravte své preference</h3>
                  <h3 className="text_tiempos ">Co vás zajímá nejvíce?</h3>
                </div>
                <ul className="flex flex-col w-1/2 ">
                  <li className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="h-[26px] w-[26px] appearance-none border border-[#1a1a1a] rounded-[50%] cursor-pointer shrink-0 "
                    />
                    <label className="pl-[10px]" htmlFor="damy">
                      Dámská móda
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-[26px] w-[26px] appearance-none border border-[#1a1a1a] rounded-[50%] cursor-pointer shrink-0"
                    />
                    <label className="pl-[10px]" htmlFor="pani">
                      Pánská móda
                    </label>
                  </li>
                </ul>
              </div>

              {/* <div> */}
              <div className="mt-4 border-t border-b border-[#d0d1d3] ">
                <div
                  onClick={() => setIsClicked((prev) => !prev)}
                  className="flex justify-between w-full py-4 px-6 hover:bg-[#efeff0] cursor-pointer"
                >
                  <button>Obsah</button>
                  {isClicked ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                </div>
                <div className={" banner_dropdown_hidden " + (isClicked ? "banner_dropdown" : "")}>
                  <div className="flex flex-col md:flex-row flex-wrap max-w-full pt-4 pb-9 px-6 ">
                    {DATA_BANNER.map((item, idx) => (
                      <div
                        key={idx}
                        className=" relative  h-[40px] lg:h-[24px] md:basis-1/2 flex mt-6 px-2 items-center "
                      >
                        <input
                          type="checkbox"
                          className="h-[24px] w-[24px] shrink-0
                            "
                        />
                        <span className=" pl-[18px]">{item}</span>
                      </div>
                    ))}
                    <div className="text-right mt-4 px-4 text-[#6230E0] text-[14px]">
                      <span className="affect_text">Zobrazit víc (pro více informací se musíte přihlásit)</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="bg-[#1a1a1a] p-3 mt-[25px] text-[#ffff] text-center font-[700] hover:opacity-70">
                Přihlaste mě
              </button>
              <p className="text-[12px] font-[400] mt-[25px] ">
                Jak vaše data zpracováváme se dozvíte v našich zásady ochrany soukromí. Z newsletteru se můžete kdykoliv
                zdarma odhlásit.
              </p>
              <p className="mt-[25px] font-[700] text-[#66676e] text-[12px] cursor-pointer">
                *Zde najdete informace o používání dárkových karet a voucherů.
              </p>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
