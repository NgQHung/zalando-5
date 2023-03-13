import React from "react";
// import styled from "styled-components";

const HOME_TOPIC = () => {
  return (
    <div className=" mt-[36px] px-[24px] flex flex-wrap md:flex-nowrap justify-between w-full ">
      <div className=" basis-[41.777%] grow pb-6">
        <p className="text-[32px] font-[700] leading-[2.25rem]">Klasické tenisky</p>
        <p className="text_tiempos text-[32px] font-[400] leading-[2.25rem]">Objevte nadčasové modely</p>
        <p className="text-[16px] pt-[24px] leading-[1.5rem] font-[700]">Zobrazit víc</p>
      </div>
      <div className="basis-[58.333%] grow max-w-[700px] min-w-[540px] min-h-[260px] max-h-[333px]">
        <img
          className="img-topic h-full w-full object-cover"
          lazy-src="Img-topic-1.png?v=<?php echo time(); ?"
          alt="topic"
        />
      </div>
    </div>
  );
};

export default HOME_TOPIC;
