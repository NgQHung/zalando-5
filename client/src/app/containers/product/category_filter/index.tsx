import { faArrowLeft, faCheck, faChevronDown, faChevronRight, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, memo } from "react";
import { FILTER_DATA } from "../../../../utils/data/filter";
import "./category_filter.css";

const Category_filter = () => {
  const [dropdown, setDropdown] = React.useState(false);
  const [typeFilter, setTypeFilter] = React.useState<string>("");
  const [allFilter, setAllFilter] = React.useState(false);
  const typeIndex = FILTER_DATA.findIndex((item) => item.title === typeFilter);
  const getData = FILTER_DATA[typeIndex]?.data || [];

  const dropdownHandler = (type: string) => {
    setTypeFilter(type);
    // if (getData) {
    if (getData.length === 0) {
      return;
    }
    // }
    setDropdown((prev) => !prev);
  };

  const allFiltersHandler = () => {
    setAllFilter(true);
  };
  return (
    <Fragment>
      <div className="flex xs:flex-wrap gap-2 relative w-screen xs:w-full overflow-x-auto xs:overflow-visible scrollbar_hide ml-[calc(-50vw+50%-8.5px)] xs:ml-0 ">
        {FILTER_DATA.map((item, idx) => (
          <button
            key={idx}
            onClick={() => dropdownHandler(item.title)}
            className="category_filter-item flex border border-[#1a1a1a] items-center outline_onHover relative whitespace-nowrap "
          >
            <span className="text-[16px] py-3 pl-3 pr-2">{item.title}</span>
            <FontAwesomeIcon icon={faChevronDown} className="h-5 object-cover mr-3 hidden xs:inline" />
            <div className="hidden xs:block">
              {dropdown && typeFilter === item.title && getData.length !== 0 ? (
                <div className="absolute top-full left-[-1px] bg-[#ffff] border border-[#1a1a1a] z-[10000] w-[312px] ">
                  {getData.map((item, index) => (
                    <div key={index} className="hover:bg-[#dddd]">
                      <div className="ml-6 border-b  py-4 pr-3 border-[#dddd] flex justify-between items-center">
                        <p className="">{item}</p>
                        <p className="h-6 w-6">
                          <FontAwesomeIcon className="h-full w-full object-cover" icon={faCheck} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </button>
        ))}
        <button
          onClick={allFiltersHandler}
          className=" flex border border-[#1a1a1a] items-center outline_onHover whitespace-nowrap"
        >
          <FontAwesomeIcon icon={faFilter} className="h-5 object-cover ml-3" />
          <span className="text-[16px] py-3 pl-3 pr-2">Zobrazit všechny filtry</span>
        </button>
      </div>
      {/* mobile  */}
      <div className="xs:hidden">
        <div className={"category_filter-allFilter " + (allFilter ? "category_filter-allFilter-active" : "")}>
          <div className="category_filter-allFilter-title flex ">
            <button onClick={() => setAllFilter(false)} className="  border border-[#dddd] shrink-0">
              <FontAwesomeIcon className="h-6 w-6 p-2 object-cover " icon={faArrowLeft} />
            </button>
            <div className="grow border border-[#dddd] flex items-center ">
              <span className="text-[16px] leading-[24px] font-[700] p-2">Filtr</span>
            </div>
          </div>
          <ul className="allFilter_list">
            {FILTER_DATA.map((items, index) => (
              <li
                key={index}
                className={`allFilter_items-${items.title} px-6 py-4 border-b border-[#dddd] flex justify-between`}
              >
                <span className="text-[16px] leading-[24px] ">{items.title}</span>
                <FontAwesomeIcon className="h-6 w-6 object-cover" icon={faChevronRight} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(Category_filter);
