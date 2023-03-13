import { faEnvelope, faEye, faEyeSlash, faLock, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../components/UI/button/Button";
import { User_login } from "../../../interfaces/authentication";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { DetectTabKey } from "../../../utils/detectTabKey";
import { UIActions } from "../../../stores/UI-slice";
import SIGNUP_LOGIN from "../signup/Signup_Login";

interface IProps {
  onSubmitHandler?: (e: React.FormEvent<HTMLFormElement>) => void;
  refInput?: React.MutableRefObject<any>;
  isClick?: boolean;
  typeInput?: string;
  input?: User_login;
  onClickHandler?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickShowPassword?: () => void;
  handleMouseDownPassword?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  passwordHasError?: boolean;
  emailInputHasError?: boolean;
  isSubmitted?: boolean;
  // inputBlurHandler: (e: React.FocusEvent<HTMLInputElement>) => void;
  // isTouched: boolean;
}

const LOGIN_FORM = ({
  onSubmitHandler,
  refInput,
  isClick,
  typeInput,
  onClickHandler,
  onChangeHandler,
  input,
  handleClickShowPassword,
  handleMouseDownPassword,
  passwordHasError,
  emailInputHasError,
  isSubmitted,
}: // isTouched,
IProps) => {
  const loginFail = useAppSelector((state) => state.authenticationSlice.loginFail);
  const emailInputRef = useRef<HTMLInputElement>(null);
  // const emptyInput = input
  const [emailIsTouched, setEmailIsTouched] = React.useState<boolean>(false);
  const [passwordIsTouched, setPasswordIsTouched] = React.useState<boolean>(false);
  const [passwordType, setPasswordType] = React.useState("password");

  const emptyEmailInputError = input?.email === "" && isSubmitted;
  const emptyPasswordInputError = input?.password === "" && isSubmitted;

  const emailInputError = emailInputHasError && emailIsTouched && isSubmitted;
  const passwordInputError = passwordHasError && passwordIsTouched && isSubmitted;

  const emailBlurHandler = () => {
    setEmailIsTouched(true);
  };
  const passwordBlurHandler = () => {
    setPasswordIsTouched(true);
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
    <section className="login_section text-center mx-auto my-0 pb-12 ">
      <div className="login_content sm:max-w-[75%] sm:basis-3/4 md:max-w-[50%] md:basis-1/2 lg:max-w-[41.6%] lg:basis-[41.6%] xl:max-w-[33.33333%] px-6 xl:basis-1/3 mx-auto my-0">
        {/* <p className="font-[700] text-[28px] ">Vítejte zpět</p> */}

        {loginFail ? (
          <div className="bg-[#efeff0] p-4 flex flex-row ">
            <div className="h-5 w-5 rounded-xl bg-[#eb0037] flex justify-center items-center shrink-0 mr-2">
              <FontAwesomeIcon icon={faXmark} className="h-3 w-3 text-[#ffff] " />
            </div>
            <p className="text-[14px] leading-[20px] tracking-[0] font-[400] flex-wrap">{loginFail}</p>
          </div>
        ) : null}
        <form className="pt-6" onSubmit={onSubmitHandler}>
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
              E-mailová adresa
            </p>
            <div
              className={
                "outline_onHover flex " + (emailInputError || emptyEmailInputError ? "outline_onHover_error" : "")
              }
            >
              <FontAwesomeIcon icon={faEnvelope} className=" h-6 w-6 py-2 pl-3" />
              <input
                className="px-[10px] w-full   outline-none "
                type="text"
                placeholder="E-mailová adresa"
                name="email"
                ref={emailInputRef}
                // tabIndex={2}
                // onKeyDown={DetectTabKey}
                onClick={onClickHandler}
                onChange={onChangeHandler}
                onBlur={emailBlurHandler}
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
              Heslo
            </p>
            <div
              className={
                "outline_onHover flex " + (passwordInputError || emptyPasswordInputError ? "outline_onHover_error" : "")
              }
            >
              <FontAwesomeIcon icon={faLock} className="h-6 w-6 py-2 pl-3" />
              <input
                className=" px-[10px] w-full outline-none "
                type={passwordType}
                placeholder="Heslo"
                name="password"
                value={input?.password}
                // tabIndex={1}
                // onKeyDown={detectTabKey}
                onBlur={passwordBlurHandler}
                onClick={onClickHandler}
                onChange={onChangeHandler}
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
          </div>
          <ButtonPrimary className=" bg-[#1a1a1a] text-[#ffff] w-full">
            <span className="text-4">Přihlásit se</span>
          </ButtonPrimary>
        </form>
        <p className=" mt-6 text-4 text-[#6328e0] font-[700]">
          <span className="affect_text">Zapomněli jste své heslo?</span>
        </p>
      </div>
    </section>
  );
};

export default memo(LOGIN_FORM);
