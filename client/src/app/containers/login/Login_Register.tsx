import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UIActions } from "../../../stores/UI-slice";
import { useAppDispatch } from "../../hooks";

const LOGIN_REGISTER = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const animationLoginSignupOnChange = () => {
    navigate("/signup");
    dispatch(UIActions.animationLoginSignupFirstTime(false));
  };
  return (
    <section className="signup_section  ">
      <div
        onClick={animationLoginSignupOnChange}
        className="text-center p-3 border border-[#1a1a1a] text-4 hover:bg-[#1a1a1a] hover:text-[#ffff] "
      >
        <button className="">Zaregistrovat se</button>
      </div>
      {/* <div className=" p-6 text-center">
        <span className="affect_text text-[14px] m-4  ">Zásady ochrany soukromí</span>
        <span className="affect_text text-[14px] m-4 ">Podmínky použití</span>
        <span className="affect_text text-[14px] mZapomněli jste své heslo?-4 ">Právní informace</span>
        <div className="sign_logo pt-4 pb-12 ">
          <img
            className="h-8 object-cover relative left-1/2 translate-x-[-50%] "
            src="https://cdn-images-1.medium.com/max/1200/1*fYAdvwatzBRQ4S6l7rGnTQ.png"
            alt="logo"
          />
        </div>
      </div> */}
    </section>
  );
};

export default memo(LOGIN_REGISTER);
