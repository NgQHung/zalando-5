import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import { UIActions } from "../../../../../stores/UI-slice";
import { HeaderCategory_DATA } from "../../../../../utils/data";
import { useAppDispatch } from "../../../../hooks";
import HeaderInput from "./header-input";
import SubHeaderCategory from "./subHeader-category";
import "./header_category.css";

const HeaderCategory = () => {
  const [category, setCategory] = React.useState<any>("");
  const dispatch = useAppDispatch();

  const onMouseHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    setTimeout(() => {
      setCategory(target.getAttribute("datatype"));
      dispatch(UIActions.backgroundColor__header(true));
    }, 500);
  };
  const onMouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCategory("");
    dispatch(UIActions.backgroundColor__header(false));
  };

  return (
    <Fragment>
      <div className=" max-w-full lg:max-w-[1216px] lg:flex items-end text-[16px] min-h-[35px] ">
        <div className=" hidden min-w-[925px] lg:flex justify-between text-[0.875rem]">
          {HeaderCategory_DATA.map((item, idx) => {
            return (
              <div
                datatype={item}
                onMouseEnter={onMouseHandler}
                onMouseLeave={onMouseLeaveHandler}
                className=" mt-[10px] pb-[6px] px-[8px] font-[400] cursor-pointer navbar_list"
                key={idx}
              >
                {/* <div className=" "> */}
                <span className="first:pl-0 affect_text cursor-pointer">
                  <Link to="/clothes">{item}</Link>
                </span>
                {/* </div> */}
                <div
                  className={
                    "sub_header_category_hidden absolute w-full top-full left-0 border-t border-[#efeff0] " +
                    (category ? "sub_header_category" : "")
                  }
                >
                  <SubHeaderCategory category={category} />
                </div>
              </div>
            );
          })}
        </div>
        <div className=" grow ">
          <HeaderInput />
        </div>
      </div>
    </Fragment>
  );
};

export default memo(HeaderCategory);
