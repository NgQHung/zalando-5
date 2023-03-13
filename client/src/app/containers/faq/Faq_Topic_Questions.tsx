import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";
import { Faq_Data_1, Faq_Data_2 } from "../../../utils/data/mobile/faq";

interface IProps {
  topicQuestions: Faq_Data_1 | Faq_Data_2;
}

const FAQ_TOPIC_QUESTIONS = ({ topicQuestions }: IProps) => {
  return (
    <div className="faq_questions-topic ">
      <div className="faq_question-topic-title text-[22px] font-bold border-b border-[#dddd] md:border-none">
        <span className="my-10 inline-block">Procházet odpovědi podle tématu</span>
      </div>
      <div className="md:flex md:flex-wrap">
        {topicQuestions.data.map((item: any, idx) => (
          <button
            key={idx}
            className=" w-full md:basis-1/2 text-left border-b border-[#dddd] md:border-none md:cursor-default md:mb-[60px] md:self-start "
          >
            {/* <div>{item.icon}</div> */}
            <img className="hidden md:block px-2" src={item.imgUrl} alt={item.title} />
            <span className="text-[20px] md:text-[32px] inline-block py-[15px] font-[700] md:pt-6 md:pb-[28px] md:leading-[28px] lg:leading-[32px] md:tracking-[-0.16px] md:px-2">
              {item.title}
            </span>
            <ul className="hidden md:block">
              {item.questions.map((question: any, inx: any) => (
                <li key={inx} className="font-[700] mb-4">
                  <span className="affect_text">{question}</span>
                </li>
              ))}
              <li className="font-[700] mb-4">
                <span className="affect_text">Zobrazit více</span>
              </li>
            </ul>
          </button>
        ))}
        <div className="">
          <button className=" w-full md:basis-1/2 text-left border-b border-[#dddd] md:border-none md:cursor-default md:mb-[60px] ">
            <span className="text-[20px] md:text-[32px] inline-block py-[15px] font-[700] md:pt-6 md:pb-[28px] md:leading-[28px] lg:leading-[32px] md:tracking-[-0.16px] md:px-2">
              Další
            </span>
            <FontAwesomeIcon
              className=" md:hidden object-cover px-4                                                                                       "
              icon={faChevronRight}
            />
            <ul className="hidden md:block">
              <li className="font-[700] mb-4">
                <span className="affect_text">Kde je má objednávka?</span>
              </li>
              <li className="font-[700] mb-4">
                <span className="affect_text">Uplatněte váš dárkový poukaz</span>
              </li>
              <li className="font-[700] mb-4">
                <span className="affect_text">Změnit doručovací adresu</span>
              </li>
            </ul>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(FAQ_TOPIC_QUESTIONS);
