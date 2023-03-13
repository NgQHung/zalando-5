import React, { memo } from "react";
import ButtonPrimary from "../../components/UI/button/Button";

const FAQ_COMMENT_QUESTIONS = () => {
  return (
    <div className="faq_questions-own text-[16px] border-b border-[#dddd] my-[10px]  ">
      <div className="mb-10 flex flex-col xs:justify-center xs:items-center xs:flex-row  ">
        <div className=" basis-full xs:basis-1/2 leading-[24px]">
          <div className="faq_questions-own-title font-bold">Máte konkrétní dotaz?</div>
          <div className="faq_questions-own-content ">Pokud se přihlásíte, můžeme vám pomoci rychleji.</div>
        </div>
        <div className="faq_questions-own-btn text-[#ffff] text-center flex basis-full xs:basis-1/2">
          <ButtonPrimary className=" w-[70%] inline-flex justify-center items-center self-center bg-[#1a1a1a]">
            <span className="leading-6">Přihlásit se</span>
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default memo(FAQ_COMMENT_QUESTIONS);
