import React, { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User_signup } from "../../../interfaces/authentication";
import { requestSignup } from "../../../services/auth-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./Signup.css";
import SIGNUP_FORM from "../../containers/signup/Signup_Form";
import SIGNUP_LOGIN from "../../containers/signup/Signup_Login";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import SIGNUP_HEADER_MOBILE from "../../containers/signup/mobile/Signup_header_mobile";
import { motion } from "framer-motion";
import LOGIN_FORM from "../../containers/login/Login_form";
import LOGIN_REGISTER from "../../containers/login/Login_Register";

export const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [typeInput, setTypeInput] = React.useState("");
  const [isClick, setIsClick] = React.useState(false);
  const animationLoginSignupFirstTime = useAppSelector((state) => state.UISlice.animationLoginSignupFirstTime);

  const [checkbox, setCheckbox] = React.useState<any>({
    interest: [],
  });
  const location = useLocation();
  const [input, setInput] = React.useState<User_signup>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onClickHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setIsClick(true);
    setTypeInput(e.currentTarget.name);
  };

  let refInput = React.useRef<any>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput({ ...input, [name]: value });
  };

  const onChangeCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.currentTarget;
    const { interest } = checkbox;

    if (checked) {
      setCheckbox({
        interest: [...interest, value],
      });
    } else {
      setCheckbox({
        interest: interest.filter((e: any) => e !== value),
      });
    }
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log({ ...input, interest: checkbox?.interest });
    requestSignup(dispatch, { ...input, interest: checkbox?.interest }, navigate);
  };

  useOnClickOutside(refInput, () => setIsClick(false));

  return (
    <Fragment>
      <SIGNUP_HEADER_MOBILE />

      <div className="login_content sm:max-w-[75%] sm:basis-3/4 md:max-w-[50%] md:basis-1/2 lg:max-w-[41.6%] lg:basis-[41.6%] xl:max-w-[33.33333%] px-6 xl:basis-1/3 mx-auto my-0">
        <SIGNUP_LOGIN />
      </div>
      {!animationLoginSignupFirstTime ? (
        <motion.div
          initial={{ y: "-140px", opacity: 1 }}
          animate={{
            y: 0,
            opacity: 0,
            transition: {
              duration: 1,
            },
          }}
          className="bg-[#ffff]"
        >
          <LOGIN_FORM />
        </motion.div>
      ) : null}
      {/* <div className="bg-[#ffff] "> */}
      <motion.div
        initial={{ y: !animationLoginSignupFirstTime ? "240px" : 0 }}
        animate={{
          y: 0,
          transition: {
            duration: 1,
          },
        }}
        className="absolute top-[260px] lg:top-[212px] left-0 right-0 h-[1px] w-full bg-[#d0d1d3] "
      />
      <motion.div
        initial={{
          y: !animationLoginSignupFirstTime ? "-100px" : "-340px",
          // opacity: animationLoginSignupFirstTime ? 0 : 1,
        }}
        animate={{
          y: "-340px",

          transition: {
            duration: 1,
          },
        }}
        className="login_content bg-[#fff] sm:max-w-[75%] sm:basis-3/4 md:max-w-[50%] md:basis-1/2 lg:max-w-[41.6%] lg:basis-[41.6%] xl:max-w-[33.33333%] px-6 xl:basis-1/3 mx-auto my-0 bg-[#ffff]"
      >
        <p className="font-[700] text-[20px] leading-[28px] mb-6">Jsem tu poprvé</p>
        <LOGIN_REGISTER />
      </motion.div>

      <motion.div
        initial={{ y: !animationLoginSignupFirstTime ? "-100px" : "-140px" }}
        animate={{
          y: !animationLoginSignupFirstTime ? "-426px" : "-140px",
          transition: {
            duration: 1,
          },
        }}
        className="bg-[#ffff] "
      >
        <SIGNUP_FORM
          onSubmitHandler={onSubmitHandler}
          refInput={refInput}
          isClick={isClick}
          typeInput={typeInput}
          onClickHandler={onClickHandler}
          onChangeHandler={onChangeHandler}
          onChangeCheckboxHandler={onChangeCheckboxHandler}
        />
      </motion.div>
      <motion.div
        initial={{ y: !animationLoginSignupFirstTime ? "-1000px" : "-140px", opacity: 0 }}
        animate={{
          y: !animationLoginSignupFirstTime ? "-400px" : "-140px",
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
      >
        <div className=" p-6 text-center">
          <span className="affect_text text-[14px] m-4  ">Zásady ochrany soukromí</span>
          <span className="affect_text text-[14px] m-4 ">Podmínky použití</span>
          <span className="affect_text text-[14px] m-4 ">Právní informace</span>
          <div className="sign_logo pt-4 pb-12 ">
            <img
              className="h-8 object-cover relative left-1/2 translate-x-[-50%] "
              src="https://cdn-images-1.medium.com/max/1200/1*fYAdvwatzBRQ4S6l7rGnTQ.png"
              alt="logo"
            />
          </div>
        </div>
      </motion.div>
      {/* </div> */}
    </Fragment>
  );
};
