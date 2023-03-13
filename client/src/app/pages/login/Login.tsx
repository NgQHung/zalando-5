import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User_login } from "../../../interfaces/authentication";
import { requestLogin } from "../../../services/auth-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { authAxios } from "../../../utils/authentication/axiosAuth";
import jwt_decode from "jwt-decode";
import { motion } from "framer-motion";
import SIGNUP_LOGIN from "../../containers/signup/Signup_Login";

import "./Login.css";
import { userActions } from "../../../stores/user-slice";
import {
  getAddressDeliveryById,
  getLikedProductById,
  getPurchasedProducts,
  getShoppingCartById,
} from "../../../services/apiRequest";
import LOGIN_FORM from "../../containers/login/Login_form";
import LOGIN_REGISTER from "../../containers/login/Login_Register";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import LOGIN_HEADER_MOBILE from "../../containers/login/mobile/Login_header_mobile";
import SIGNUP_FORM from "../../containers/signup/Signup_Form";

const emailInputIsValid = (value: string) => value.includes("@") && value.includes(".");
const passwordIsValid = (value: any) => value.length > 5;

export const Login = () => {
  const [typeInput, setTypeInput] = React.useState("");
  const [isClick, setIsClick] = React.useState(false);
  const [input, setInput] = React.useState<User_login>({ email: "", password: "", showPassword: false });
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  // const [isTouched, setIsTouched] = React.useState<boolean>(false);

  const refInput = React.useRef<any>(null);
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);
  const allProducts = useAppSelector((state) => state.productSlice.allProducts);
  const inputTabKey = useAppSelector((state) => state.UISlice.nextInput);
  const passwordHasError = !passwordIsValid(input.password);
  const emailInputHasError = !emailInputIsValid(input.email);
  const typeAnimation: string = useAppSelector((state) => state.UISlice.animationLoginSignup);
  const animationLoginSignupFirstTime = useAppSelector((state) => state.UISlice.animationLoginSignupFirstTime);
  const emptyEmailInputError = input?.email === "" && isSubmitted;
  const emptyPasswordInputError = input?.password === "" && isSubmitted;

  // console.log(typeAnimation);

  const handleClickShowPassword = () => {
    setInput({ ...input, showPassword: !input.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const accessToken = user?.accessToken;

  const onClickHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setIsClick(true);
    setTypeInput(e.currentTarget.name);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput({ ...input, [name]: value });
  };

  // refresh token
  const refreshToken = async () => {
    try {
      const response = await authAxios.post("/v1/auth/refresh");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const date = new Date();
      const decodedToken: any = jwt_decode(accessToken!);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data: any = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(userActions.loginHandler(refreshUser));
        if (config !== undefined && config.headers !== undefined) {
          config.headers["authorization"] = "Bearer " + data.accessToken;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (passwordHasError || emailInputHasError) {
    //   setIsSubmitted(true);
    //   return;
    // }

    requestLogin(dispatch, input, navigate, accessToken!);
  };

  useOnClickOutside(refInput, () => setIsClick(false));

  useEffect(() => {
    let subscribe = true;
    if (user && subscribe) {
      getShoppingCartById(dispatch, user, allProducts);
      getLikedProductById(dispatch, user);
      getAddressDeliveryById(dispatch, user);
      getPurchasedProducts(dispatch, user);
      localStorage.setItem("persist:root", "");
    }
    return () => {
      subscribe = false;
    };
  }, [user]);

  // useEffect(() => {
  //   getPurchasedProducts(dispatch, user);
  // }, []);

  // console.log(typeAnimationLogin);

  return (
    <Fragment>
      <LOGIN_HEADER_MOBILE />

      <div className="login_content sm:max-w-[75%] sm:basis-3/4 md:max-w-[50%] md:basis-1/2 lg:max-w-[41.6%] lg:basis-[41.6%] xl:max-w-[33.33333%] px-6 xl:basis-1/3 mx-auto my-0">
        <SIGNUP_LOGIN />
      </div>

      <motion.div
        initial={{ y: !animationLoginSignupFirstTime ? 0 : "-142px", opacity: !animationLoginSignupFirstTime ? 0 : 1 }}
        animate={{
          y: "-142px",
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
        className="bg-[#ffff] "
      >
        <LOGIN_FORM
          onSubmitHandler={onSubmitHandler}
          refInput={refInput}
          isClick={isClick}
          typeInput={typeInput}
          onClickHandler={onClickHandler}
          onChangeHandler={onChangeHandler}
          input={input}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
          passwordHasError={passwordHasError}
          emailInputHasError={emailInputHasError}
          isSubmitted={isSubmitted}
        />
      </motion.div>
      <motion.div
        initial={{ y: !animationLoginSignupFirstTime ? "-240px" : 0 }}
        animate={{
          y: emptyEmailInputError ? "64px" : 0,
          transition: {
            duration: 1,
          },
        }}
        className="absolute top-[500px] lg:top-[452px] left-0 right-0 h-[1px] w-full bg-[#d0d1d3]"
      />

      <div className="bg-[#ffff] ">
        <motion.div
          initial={{ y: !animationLoginSignupFirstTime ? "-340px" : "-100px" }}
          animate={{
            y: "-100px",
            transition: {
              duration: 1,
            },
          }}
          className="sm:max-w-[75%] sm:basis-3/4 md:max-w-[50%] md:basis-1/2 lg:max-w-[41.6%] lg:basis-[41.6%] xl:max-w-[33.33333%] px-6 xl:basis-1/3 mx-auto my-0 bg-[#ffff] "
        >
          <p className="font-[700] text-[20px] leading-[28px] mb-6">Jsem tu poprvé</p>
          <LOGIN_REGISTER />
        </motion.div>
        {!animationLoginSignupFirstTime ? (
          <motion.div
            initial={{ y: "-426px", opacity: 1 }}
            animate={{
              y: "-100px",
              opacity: 0,
              transition: {
                duration: 1,
              },
            }}
          >
            <SIGNUP_FORM />
          </motion.div>
        ) : null}
        <motion.div
          initial={{ y: "-900px", opacity: 0 }}
          animate={{
            y: "-1000px",
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
      </div>
    </Fragment>
  );
};
