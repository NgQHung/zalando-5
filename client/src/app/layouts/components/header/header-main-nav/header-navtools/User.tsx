import React, { Fragment, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { requestLogout } from "../../../../../../services/auth-slice";
import { UIActions } from "../../../../../../stores/UI-slice";
import { refreshPage } from "../../../../../../utils/refreshPage";
import ButtonPrimary from "../../../../../components/UI/button/Button";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import "./navtools.css";

const User = () => {
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);
  const accessToken = user?.accessToken!;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const animationLoginSignupHandler = (typeAnimation: string) => {
    // console.log('render')
    dispatch(UIActions.animationLoginSignup(typeAnimation));
    dispatch(UIActions.animationLoginSignupFirstTime(true));
    navigate(`/${typeAnimation}`);
  };

  const logoutHandler = () => {
    if (!user) return;
    requestLogout(dispatch, navigate, accessToken);
    localStorage.setItem("persist:root", "null");
    localStorage.setItem("User", "null");
    refreshPage();
  };

  return (
    <Fragment>
      <div className="bg-white border border-black z-[10000] ">
        <div className=" pt-[2px] relative ">
          {!user && (
            <div className=" text-[#ffff] text-center pt-4 pb-[13px] px-[10px] border_bottom">
              {/* <Link to="/login"> */}
              <button
                onClick={() => animationLoginSignupHandler("login")}
                className=" bg-[#1a1a1a] mb-[14px] text-[16px] relative w-full leading-[24px] tracking-[-0.16px] whitespace-nowrap font-[700] text-ellipsis hover:opacity-80 p-3 transition-all text-[#ffff] text-center cursor-pointer"
              >
                <span>Přihlásit se</span>
              </button>
              {/* </Link> */}
              <div className="relative w-full leading-[24px] tracking-[-0.16px] font-[700] text-ellipsis hover:opacity-80 transition-all text-[#ffff] cursor-pointer text-[14px] text-[#1a1a1a] ml-[16px] whitespace-normal text-left">
                <button
                  onClick={() => animationLoginSignupHandler("signup")}
                  className="text-[#6328e0] affect_text mb-1 "
                >
                  <span>Zaregistrujte se hned teď</span>
                </button>{" "}
                - trvá to jen minutu.
              </div>
            </div>
          )}

          <ul className=" mx-[26px]">
            <Link to="/myaccount">
              <li className="user_list">
                <span className="user_item">Váš přehled</span>
              </li>
            </Link>
            <li className="user_list">
              <span className="user_item">Objednávky</span>
            </li>
            <li className="user_list">
              <span className="user_item">Vrátit zboží</span>
            </li>
            <li className="user_list">
              <span className="user_item">Nápověda a kontakt</span>
            </li>
          </ul>
          {user && (
            <div onClick={logoutHandler} className=" text-left pt-4 pb-[13px] px-[26px] border-t border-[#1a1a1a] ">
              <span className="text-[14px] affect_text">Nejste {user.firstName}? Odhlásit se</span>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default memo(User);
