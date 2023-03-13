import React, { Fragment } from "react";
import Container from "../../container";
import { DATA_FAVORITE } from "../../../../utils/data/footer/footerFavorite";

const brand_data = DATA_FAVORITE[1];
const category_data = DATA_FAVORITE[0];

const Favorite = () => {
  return (
    <Fragment>
      <Container bg_color="">
        <div className="flex flex-col mx-[18px] md:mx-[24px] my-[64px] flex-wrap md:flex-nowrap">
          <div>
            <h2 className="px-[8px] my-9 text-[20px] lg:text-[28px] font-[600] leading-[28px] lg:leading-[20px] tracking-[-0.28px]">
              {category_data.title}
            </h2>
            <ul className="flex flex-wrap max-w-full ">
              {category_data.types.map((category, idx) => (
                <li
                  key={idx}
                  className="mb-[12px] max-w-1/2 basis-1/2 whitespace-nowrap text-ellipsis overflow-hidden md:max-w-1/4 md:basis-1/4 px-[8px] text-[14px] "
                >
                  <span className="affect_text">{category}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="px-[8px] my-9 text-[20px] lg:text-[28px] font-[600] leading-[28px] lg:leading-[20px]  tracking-[-0.28px]">
              {brand_data.title}
            </h2>
            <ul className="flex flex-wrap max-w-full ">
              {brand_data.types.map((brand, idx) => (
                <li
                  key={idx}
                  className="mb-[12px] max-w-1/2 basis-1/2 whitespace-nowrap text-ellipsis overflow-hidden md:max-w-1/4 md:basis-1/4 px-[8px] text-[14px] "
                >
                  <span className="affect_text">{brand}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Favorite;
