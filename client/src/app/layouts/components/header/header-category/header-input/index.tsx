import React, { Fragment, memo, useEffect } from "react";
import "./HeaderInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../../hooks";
import { mobileActions } from "../../../../../../stores/mobile-slice";
import useOnClickOutside from "../../../../../hooks/useOnClickOutside";

const HeaderInput = () => {
  const [isTouched, setIsTouched] = React.useState(false);
  const dispatch = useAppDispatch();

  const onClickHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, type?: string) => {
    if (e.currentTarget.name === "searchScreen") {
      setIsTouched(true);
    } else {
      setIsTouched(false);
    }
  };

  const navbarsHandler = () => {
    dispatch(mobileActions.mobile_navbar(true));
  };

  // outside click
  let refInput = React.useRef<any>(null);

  useOnClickOutside(refInput, () => setIsTouched(false));

  return (
    <Fragment>
      {/* search for screen start */}
      <div
        ref={refInput}
        className={
          "hidden header_search lg:flex items-center h-[35px] text-[#1a1a1a] tracking-[0.5px] grow  bg-[#efeff0] " +
          (isTouched ? "header_search_transition" : "")
        }
      >
        <div className="w-[50px] text-center ">
          <span className="text-[18px] ">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
        </div>
        <input
          onClick={onClickHandler}
          name="searchScreen"
          className="bg-transparent grow h-full w-full py-[6px] outline-none text-[14px] "
          type="text"
          placeholder="Hledat"
        />
        {isTouched && (
          <div onClick={() => setIsTouched(false)} className="absolute right-0 px-[4px] cursor-pointer ">
            <FontAwesomeIcon icon={faXmark} />
          </div>
        )}
      </div>
      {/* search for screen end */}
      {/* search for mobile start */}
      <div className=" lg:hidden w-full border-t border-b border-[#d0d1d3] ">
        <div className="flex items-center ">
          <FontAwesomeIcon
            onClick={navbarsHandler}
            icon={faBars}
            className="w-6 h-full p-[10px] border-r border-[#d0d1d3] "
          />
          <Link to="/search" className="w-full">
            <div className=" flex items-stretch justify-between grow  w-full   ">
              <input
                name="searchMobile"
                type="text"
                onClick={onClickHandler}
                className="w-full  pl-[13px] m-0 text-[16px] outline-none"
                placeholder="Hledat"
              />
              <FontAwesomeIcon className="h-6 p-[10px]" icon={faMagnifyingGlass} />
            </div>
          </Link>
        </div>
      </div>

      {/* search for mobile end */}
    </Fragment>
  );
};

export default memo(HeaderInput);
