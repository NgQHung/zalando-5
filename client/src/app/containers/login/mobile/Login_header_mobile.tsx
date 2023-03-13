import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UIActions } from "../../../../stores/UI-slice";
import { useAppDispatch } from "../../../hooks";

const LOGIN_HEADER_MOBILE = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const animationLoginSignupOnChange = () => {
    navigate("/signup");
    dispatch(UIActions.animationLoginSignupFirstTime(false));
  };

  return (
    // <div className="relative">
    <div>
      <div className="flex items-stretch border h-12 lg:hidden">
        <div className="cursor-pointer " onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faXmark} className="h-6 w-6 p-3 shrink-0 " />
        </div>

        <div className="border-x border-[#d0d1d3] flex justify-between grow items-center py-3 pl-6 pr-3 font-[700] text-[16px]  leading-6 ">
          <p>
            <span>Přihlásit se</span>
          </p>
          <div onClick={animationLoginSignupOnChange}>
            <span className="text-[#6328e0] affect_text">Zaregistrovat se</span>
          </div>
        </div>
        {/* </div> */}
      </div>
      <div className="login_header_logo max-w-[1216px] mx-auto my-0 text-left px-6 pt-4 pb-6 flex items-start">
        <Link to="/home-page">
          <img className="h-[25px] object-cover leading-[25px]" src="Logo.png" alt="logo" />
        </Link>
      </div>
    </div>
  );
};

export default LOGIN_HEADER_MOBILE;
