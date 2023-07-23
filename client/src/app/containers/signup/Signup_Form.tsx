import { faCircleExclamation, faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useRef } from "react";
// import { Link } from "react-router-dom";
import { User_signup } from "../../../interfaces/authentication";
import { useAppSelector } from "../../hooks";

interface IProps {
  onSubmitHandler?: (e: React.FormEvent<HTMLFormElement>) => void;
  refInput?: React.MutableRefObject<any>;
  isClick?: boolean;
  typeInput?: string;
  input?: User_signup;
  onClickHandler?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCheckboxHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickShowPassword?: () => void;
  handleMouseDownPassword?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  passwordHasError?: boolean;
  emailHasError?: boolean;
  firstNameHasError?: boolean;
  lastNameHasError?: boolean;
  isSubmitted?: boolean;
}

const SIGNUP_FORM = ({
  onSubmitHandler,
  refInput,
  isClick,
  typeInput,
  onClickHandler,
  onChangeHandler,
  onChangeCheckboxHandler,
  handleClickShowPassword,
  handleMouseDownPassword,
  input,
  passwordHasError,
  emailHasError,
  firstNameHasError,
  lastNameHasError,
  isSubmitted,
}: IProps) => {
  const signupFail = useAppSelector((state) => state.authenticationSlice.signupFail);
  const emailInputRef = useRef<HTMLInputElement>(null);
  // const emptyInput = input
  const [emailIsTouched, setEmailIsTouched] = React.useState<boolean>(false);
  const [passwordIsTouched, setPasswordIsTouched] = React.useState<boolean>(false);
  const [firstNameIsTouched, setFirstNameIsTouched] = React.useState<boolean>(false);
  const [lastNameIsTouched, setLastNameIsTouched] = React.useState<boolean>(false);
  const [passwordType, setPasswordType] = React.useState("password");

  const emptyEmailInputError = input?.email === "" && isSubmitted;
  const emptyPasswordInputError = input?.password === "" && isSubmitted;
  const emptyFirstNameInputError = input?.firstName === "" && isSubmitted;
  const emptyLastNameInputError = input?.lastName === "" && isSubmitted;

  const emailInputError = emailHasError && emailIsTouched && isSubmitted;
  const passwordInputError = passwordHasError && passwordIsTouched && isSubmitted;
  const firstNameInputError = firstNameHasError && firstNameIsTouched && isSubmitted;
  const lastNameInputError = lastNameHasError && lastNameIsTouched && isSubmitted;

  const emailBlurHandler = () => {
    setEmailIsTouched(true);
  };
  const passwordBlurHandler = () => {
    setPasswordIsTouched(true);
  };
  const firstNameBlurHandler = () => {
    setFirstNameIsTouched(true);
  };
  const lastNameBlurHandler = () => {
    setLastNameIsTouched(true);
  };

  // show and hide password
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="login_content mt-[36px] text-center mx-auto my-0 ">
      <div className="login_content sm:max-w-[75%] sm:basis-3/4 md:max-w-[50%] md:basis-1/2 lg:max-w-[41.6%] lg:basis-[41.6%] xl:max-w-[33.33333%] px-6 xl:basis-1/3 mx-auto my-0">
        {signupFail ? (
          <div className="bg-[#efeff0] p-4 flex flex-row ">
            <div className="h-5 w-5 rounded-xl bg-[#eb0037] flex justify-center items-center shrink-0 mr-2">
              <FontAwesomeIcon icon={faXmark} className="h-3 w-3 text-[#ffff] " />
            </div>
            <p className="text-[14px] leading-[20px] tracking-[0] font-[400] flex-wrap">{signupFail}</p>
          </div>
        ) : null}
        <form className="pt-6" onSubmit={onSubmitHandler}>
          <div className="firstName_input pb-6 flex flex-col ">
            <p
              ref={refInput}
              className={
                " relative top-[0.4px] py-1 px-2 text-[12px] border border-[#1a1a1a] self-start " +
                (firstNameInputError || emptyFirstNameInputError
                  ? "outline_onHover_error text-[#ffff] bg-[#eb0037]"
                  : isClick && typeInput === "firstName"
                  ? "bg-[#1a1a1a] text-[#ffff] "
                  : "")
              }
            >
              Křestní jméno*
            </p>
            <div className="outline_onHover flex items-center ">
              <input
                className="py-3 px-[10px] w-full h-full outline-none "
                type="text"
                placeholder="Křestní jméno"
                name="firstName"
                onClick={onClickHandler}
                onChange={onChangeHandler}
                onBlur={firstNameBlurHandler}
                autoComplete="current-password"
              />
            </div>
            {emptyFirstNameInputError ? (
              <div className="text-[12px] h-8 mt-1 font-[400] flex text-[#eb0037] ">
                <p className="border border-[#eb0037] bg-[#eb0037] rounded-xl h-3 w-3 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faXmark} className="text-[#ffff]  " />
                </p>
                <p className="  ml-1">Toto pole je povinné</p>
              </div>
            ) : firstNameInputError ? (
              <div className="text-[12px] h-8 mt-1 font-[400] flex text-[#eb0037] text-left ">
                <p className="border border-[#eb0037] bg-[#eb0037] rounded-xl h-3 w-3 flex items-center justify-center shrink-0 ">
                  <FontAwesomeIcon icon={faXmark} className="text-[#ffff]  " />
                </p>
                <p className="  ml-1">Zadejte prosím platné křestní jméno</p>
              </div>
            ) : null}
          </div>
          <div className="lastName_input pb-6 flex flex-col ">
            <p
              ref={refInput}
              className={
                " relative top-[0.4px] py-1 px-2 text-[12px] border border-[#1a1a1a] self-start " +
                (lastNameInputError || emptyLastNameInputError
                  ? "outline_onHover_error text-[#ffff] bg-[#eb0037]"
                  : isClick && typeInput === "lastName"
                  ? "bg-[#1a1a1a] text-[#ffff] "
                  : "")
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
                onBlur={lastNameBlurHandler}
                autoComplete="current-password"
              />
            </div>
            {emptyLastNameInputError ? (
              <div className="text-[12px] h-8 mt-1 font-[400] flex text-[#eb0037] ">
                <p className="border border-[#eb0037] bg-[#eb0037] rounded-xl h-3 w-3 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faXmark} className="text-[#ffff]  " />
                </p>
                <p className="  ml-1">Toto pole je povinné</p>
              </div>
            ) : lastNameInputError ? (
              <div className="text-[12px] h-8 mt-1 font-[400] flex text-[#eb0037] text-left ">
                <p className="border border-[#eb0037] bg-[#eb0037] rounded-xl h-3 w-3 flex items-center justify-center shrink-0 ">
                  <FontAwesomeIcon icon={faXmark} className="text-[#ffff]  " />
                </p>
                <p className="  ml-1">Zadejte prosím platné příjmení</p>
              </div>
            ) : null}
          </div>
          <div className="email_input pb-6 flex flex-col ">
            <p
              ref={refInput}
              className={
                " relative top-[0.4px] py-1 px-2 text-[12px] border border-[#1a1a1a] self-start " +
                (emailInputError || emptyEmailInputError
                  ? "outline_onHover_error text-[#ffff] bg-[#eb0037]"
                  : isClick && typeInput === "email"
                  ? "bg-[#1a1a1a] text-[#ffff] "
                  : "")
              }
            >
              E-mailová adresa*
            </p>
            <div className="outline_onHover flex items-center ">
              <input
                className="py-3 px-[10px] w-full h-full outline-none "
                type="text"
                placeholder="E-mailová adresa"
                name="email"
                onClick={onClickHandler}
                onChange={onChangeHandler}
                onBlur={emailBlurHandler}
                autoComplete="current-password"
              />
            </div>
            {emptyEmailInputError ? (
              <div className="text-[12px] h-8 mt-1 font-[400] flex text-[#eb0037] ">
                <p className="border border-[#eb0037] bg-[#eb0037] rounded-xl h-3 w-3 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faXmark} className="text-[#ffff]  " />
                </p>
                <p className="  ml-1">Toto pole je povinné</p>
              </div>
            ) : emailInputError ? (
              <div className="text-[12px] h-8 mt-1 font-[400] flex text-[#eb0037] text-left ">
                <p className="border border-[#eb0037] bg-[#eb0037] rounded-xl h-3 w-3 flex items-center justify-center shrink-0 ">
                  <FontAwesomeIcon icon={faXmark} className="text-[#ffff]  " />
                </p>
                <p className="  ml-1">Zadejte prosím platnou e-mailovou adresu (například: vase.jmeno@domena.cz)</p>
              </div>
            ) : null}
          </div>
          <div className="password_input pb-6 flex flex-col">
            <p
              ref={refInput}
              className={
                " relative top-[0.4px] py-1 px-2 text-[12px] border border-[#1a1a1a] self-start " +
                (passwordInputError || emptyPasswordInputError
                  ? "outline_onHover_error text-[#ffff] bg-[#eb0037]"
                  : isClick && typeInput === "password"
                  ? "bg-[#1a1a1a] text-[#ffff] "
                  : "")
              }
            >
              Heslo*
            </p>
            <div className="outline_onHover flex items-center   ">
              <input
                className="py-3 px-[10px] w-full h-full outline-none"
                type={passwordType}
                placeholder="Heslo"
                name="password"
                value={input?.password}
                onBlur={passwordBlurHandler}
                onClick={onClickHandler}
                onChange={onChangeHandler}
                autoComplete="current-password"
              />
              <button type="button" className="py-2 pr-3" onClick={togglePassword}>
                {passwordType === "password" ? (
                  <FontAwesomeIcon title="Zobrazit" icon={faEye} className="" />
                ) : (
                  <FontAwesomeIcon title="Skrýt" icon={faEyeSlash} className="" />
                )}
              </button>
            </div>
            {emptyPasswordInputError ? (
              <div className="text-[12px] h-8 mt-1 font-[400] flex text-[#eb0037] ">
                <p className="border border-[#eb0037] bg-[#eb0037] rounded-xl h-3 w-3 flex items-center justify-center ">
                  <FontAwesomeIcon icon={faXmark} className="text-[#ffff] " />
                </p>
                <p className="  ml-1">Toto pole je povinné</p>
              </div>
            ) : passwordInputError ? (
              <div className="text-[12px] h-8 mt-1 font-[400] flex text-[#eb0037] ">
                <p className="border border-[#eb0037] bg-[#eb0037] rounded-xl h-3 w-3 flex items-center justify-center shrink-0 ">
                  <FontAwesomeIcon icon={faXmark} className="text-[#ffff]  " />
                </p>
                <p className="  ml-1">Zadaný text je příliš krátký.</p>
              </div>
            ) : null}
            <div className="text-left flex flex-row items-center text-[12px]  mt-2 ">
              <FontAwesomeIcon icon={faCircleExclamation} className="h-[14px] w-[14px] mr-3" />
              <p className="">Vaše heslo musí být delší než 8 znaků.</p>
            </div>
          </div>
          <div className="text-[16px] text-left pb-6 border-b-[1px]  border-[#d0d1d3] ">
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
                  autoComplete="current-password"
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
                  autoComplete="current-password"
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
                  autoComplete="current-password"
                />
                <label className="pl-[10px]" htmlFor="none">
                  Bez preference
                </label>
              </li>
            </ul>
          </div>
          <div className="pb-6 flex items-start pt-6 justify-between text-left">
            <input
              type="checkbox"
              value="dailyInfo"
              className="h-[26px] w-[26px] pr-[24px] shrink-0  cursor-pointer"
              onChange={onChangeCheckboxHandler}
              autoComplete="current-password"
            />
            <label className="pl-3">
              Ano, chci občas dostávat e-maily o speciálních nabídkách, nových produktech a exkluzivních propagačních
              akcích. Svůj odběr můžu kdykoli zrušit. (Volitelné)
            </label>
          </div>
          <button className="text-center p-4 bg-[#1a1a1a] text-[#ffff] hover:opacity-70 mb-3 w-full">
            <span className="text-4">Zaregistrovat se</span>
          </button>
          <p className="text-[12px] mb-4 text-[#66676e] text-left">* povinné pole</p>
          <p className="text-left">
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
