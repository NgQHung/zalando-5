import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
// import { UseOutsideClick } from "../../../../utils/useOutsideClick";
const SearchMobile = () => {
  const navigate = useNavigate();
  const [searchMobileClick, setSearchMobileClick] = React.useState(false);

  const onClickHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>, type?: string) => {
    if (e.currentTarget.name === "searchMobile") {
      setSearchMobileClick(true);
    } else {
      setSearchMobileClick(false);
    }
  };

  const refInput = React.useRef<any>(null);

  useOnClickOutside(refInput, () => setSearchMobileClick(false));

  // const {searchMobile, refInput} = UseOutsideClick()

  return (
    <Fragment>
      {/* search for mobile start */}

      <motion.div
        initial={{ y: 60 }}
        animate={{
          y: 0,
          transition: {
            duration: 0.5,
            type: "tween",
          },
        }}
        ref={refInput}
        className="relative"
      >
        <div className="flex items-center">
          <div className="border-b border-t border-[#d0d1d3]" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeftLong} className="h-6 p-[9px] " />
          </div>

          <div className="border border-[#d0d1d3] flex justify-between grow   items-center  ">
            <input
              name="searchMobile"
              type="text"
              onClick={onClickHandler}
              className="w-full h-full pl-[13px] text-[16px] outline-none"
              placeholder="Hledat"
            />
            <FontAwesomeIcon className="h-6 p-[10px]" icon={faMagnifyingGlass} />
          </div>
        </div>
      </motion.div>
      {/* search for mobile end */}
    </Fragment>
  );
};

export default SearchMobile;
