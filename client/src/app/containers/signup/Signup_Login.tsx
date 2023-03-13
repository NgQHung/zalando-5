import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UIActions } from "../../../stores/UI-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const SIGNUP_LOGIN = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const animationLoginSignupFirstTime = useAppSelector((state) => state.UISlice.animationLoginSignupFirstTime);

  const animationLoginSignupOnChange = () => {
    navigate("/login");
    dispatch(UIActions.animationLoginSignupFirstTime(false));
  };
  return (
    <div className="mb-[72px]">
      <p className="font-[700] text-[28px] leading-[32px] mb-6 ">Vítejte zpět</p>
      {/* <Link to="/login"> */}
      {/* {!animationLoginSignupFirstTime ? ( */}
      <div
        onClick={animationLoginSignupOnChange}
        className="text-center p-3 border-[3px] font-[700] border-[#1a1a1a] text-4 hover:bg-[#1a1a1a] hover:text-[#ffff] hover:opacity-70"
      >
        <button className="">Přihlásit se</button>
      </div>
      {/* ) : null} */}
      {/* </Link> */}
    </div>
  );
};

export default memo(SIGNUP_LOGIN);
