import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";
import { Link } from "react-router-dom";

interface IProps {
  onSubmitHandler?: (e: React.FormEvent<HTMLFormElement>) => void;
  refInput?: React.MutableRefObject<any>;
  isClick?: boolean;
  typeInput?: string;
  onClickHandler?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCheckboxHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SIGNUP_FORM = ({
  onSubmitHandler,
  refInput,
  isClick,
  typeInput,
  onClickHandler,
  onChangeHandler,
  onChangeCheckboxHandler,
}: IProps) => {
  return (
    <div className="login_content mt-[36px] text-center mx-auto my-0 ">
      <div className="login_content sm:max-w-[75%] sm:basis-3/4 md:max-w-[50%] md:basis-1/2 lg:max-w-[41.6%] lg:basis-[41.6%] xl:max-w-[33.33333%] px-6 xl:basis-1/3 mx-auto my-0">
        {/* <p className="text-[28px] font-[700] ">Jsem tu poprvé</p> */}
        <form className="pt-6" onSubmit={onSubmitHandler}>
          <div className="firstName_input pb-6 flex flex-col ">
            <p
              ref={refInput}
              className={
                " relative top-[1px] py-1 px-2 text-[12px] border border-t-[#1a1a1a] border-l-[#1a1a1a] border-r-[#1a1a1a] self-start " +
                (isClick && typeInput === "firstName" ? "bg-[#1a1a1a] text-[#ffff] " : "")
              }
            >
              Křestní jméno*
            </p>
            <div className="outline_onHover flex items-center ">
              {/* <FontAwesomeIcon icon={faEnvelope} className="h-6 py-2 pl-3" /> */}
              <input
                className="py-3 px-[10px] w-full h-full outline-none "
                type="text"
                placeholder="Křestní jméno"
                name="firstName"
                onClick={onClickHandler}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="lastName_input pb-6 flex flex-col ">
            <p
              ref={refInput}
              className={
                " relative top-[1px] py-1 px-2 text-[12px] border border-t-[#1a1a1a] border-l-[#1a1a1a] border-r-[#1a1a1a] self-start " +
                (isClick && typeInput === "lastName" ? "bg-[#1a1a1a] text-[#ffff] " : "")
              }
            >
              Příjmení*
            </p>
            <div className="outline_onHover flex items-center ">
              <input
                className="py-3 px-[10px] w-full h-full outline-none "
                type="text"
                placeholder="Příjmení"
                name="lastName"
                onClick={onClickHandler}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="email_input pb-6 flex flex-col ">
            <p
              ref={refInput}
              className={
                " relative top-[1px] py-1 px-2 text-[12px] border border-t-[#1a1a1a] border-l-[#1a1a1a] border-r-[#1a1a1a] self-start " +
                (isClick && typeInput === "email" ? "bg-[#1a1a1a] text-[#ffff] " : "")
              }
            >
              E-mailová adresa
            </p>
            <div className="outline_onHover flex items-center ">
              <input
                className="py-3 px-[10px] w-full h-full outline-none "
                type="text"
                placeholder="E-mailová adresa"
                name="email"
                onClick={onClickHandler}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="password_input pb-6 flex flex-col">
            <p
              ref={refInput}
              className={
                " relative top-[1px] py-1 px-2 text-[12px] border border-t-[#1a1a1a] border-l-[#1a1a1a] border-r-[#1a1a1a] self-start " +
                (isClick && typeInput === "password" ? "bg-[#1a1a1a] text-[#ffff] " : "")
              }
            >
              Heslo
            </p>
            <div className="outline_onHover flex items-center   ">
              <input
                className="py-3 px-[10px] w-full h-full outline-none"
                type="text"
                placeholder="Heslo"
                name="password"
                onClick={onClickHandler}
                onChange={onChangeHandler}
              />
              <FontAwesomeIcon icon={faEye} className="h- py-2 pr-3" />
            </div>
            <p className="text-[14px] mt-2 ">Vaše heslo musí být delší než 6 znaků.</p>
          </div>
          <div className="text-[16px] pb-6 border-b-[1px]  border-[#d0d1d3] ">
            <p>
              Co vás nejvíc zajímá? <span className="text-[#66676e] text-[14px]">(Volitelné)</span>
            </p>
            <p className="pt-4 pb-6 text-[14px] text-[#66676e] ">
              Tuto informaci využijeme k výběru doporučení vám přesně na míru.
            </p>
            <ul className="flex flex-col w-1/2    ">
              <li className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="women"
                  className="h-[26px] w-[26px] cursor-pointer "
                  onChange={onChangeCheckboxHandler}
                />
                <label className="pl-[10px]" htmlFor="damy">
                  Dámská móda
                </label>
              </li>
              <li className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="men"
                  className="h-[26px] w-[26px] cursor-pointer"
                  onChange={onChangeCheckboxHandler}
                />
                <label className="pl-[10px] " htmlFor="pani">
                  Pánská móda
                </label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  value="noInterest"
                  className="h-[26px] w-[26px] cursor-pointer"
                  onChange={onChangeCheckboxHandler}
                />
                <label className="pl-[10px]" htmlFor="none">
                  Bez preference
                </label>
              </li>
            </ul>
          </div>
          <div className="pb-6 flex items-start pt-6 justify-between">
            <input
              type="checkbox"
              value="dailyInfo"
              className="h-[26px] w-[26px] pr-[24px] shrink-0  cursor-pointer"
              onChange={onChangeCheckboxHandler}
            />
            <label className="pl-3">
              Ano, chci občas dostávat e-maily o speciálních nabídkách, nových produktech a exkluzivních propagačních
              akcích. Svůj odběr můžu kdykoli zrušit. (Volitelné)
            </label>
          </div>
          <button className="text-center p-4 bg-[#1a1a1a] text-[#ffff] hover:opacity-70 mb-3 w-full">
            <span className="text-4">Zaregistrovat se</span>
          </button>
          <p className="text-[12px] mb-4 text-[#66676e]">* povinné pole</p>
          <p>
            Registrací souhlasíte s našimi {""}
            <span className="mt-6 text-4 text-[#6328e0] affect_text"> Podmínkami použití</span>. Prosím přečtěte si naše{" "}
            <span className="mt-6 text-4 text-[#6328e0] affect_text">Zásady ochrany osobních údajů.</span>
          </p>
        </form>
      </div>
      {/* <p className="affect_text mt-6 text-4 text-[#6328e0] font-[700]">Zapomněli jste své heslo?</p> */}
    </div>
  );
};

export default memo(SIGNUP_FORM);
