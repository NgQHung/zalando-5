import React, { memo } from "react";
import { Faq_Data_1, Faq_Data_2 } from "../../../utils/data/mobile/faq";

interface IProps {
  mostQuestions: Faq_Data_1 | Faq_Data_2;
}

const FAQ_INTRO = ({ mostQuestions }: IProps) => {
  return (
    <>
      <div className="faq_title text-[28px] leading-9 font-[700] my-3 ">
        Dobrý den,
        <br />
        jak vám můžeme pomoci?
      </div>
      <div className="faq_content text-[16px] font-[400] tracking-[-0.16px] leading-6 flex flex-wrap ">
        Zde najdete pomoc snadno a rychle. Můžete sledovat, zrušit nebo vrátit vaše objednávky. Naleznete tady také
        odpovědi na mnoho otázek.
      </div>
      <div className="faq_questions-common mt-[30px] border-b border-[#dddd] ">
        <div className="mr-[16px] mb-[18px]">
          <div className="faq_questions-common-title text-[20px] font-bold leading-[22.6px]">Nejčastější dotazy</div>
          <ul className="faq_questions_list mt-[16px] flex flex-col md:flex-row md:flex-wrap leading-[24px] ">
            {mostQuestions.data.map((question: any, idx) => (
              <li key={idx} className="text-[16px] mb-[16px] md:basis-1/2 ">
                <span className="affect_text font-[700]">{question}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default memo(FAQ_INTRO);
