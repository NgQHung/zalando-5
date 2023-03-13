import React from "react";
import { faq_data } from "../../../utils/data/mobile/faq";
import Container from "../../layouts/container";
import FAQ_COMMENT_QUESTIONS from "../../containers/faq/Faq_Common_Questions";
import FAQ_INTRO from "../../containers/faq/Faq_intro";
import FAQ_TOPIC_QUESTIONS from "../../containers/faq/Faq_Topic_Questions";

const Faq = () => {
  const mostQuestionsIndex = faq_data.findIndex((item) => item.title === "mostQuestions");
  const topicQuestionsIndex = faq_data.findIndex((item) => item.title === "topicQuestions");
  const mostQuestions = faq_data[mostQuestionsIndex];
  const topicQuestions = faq_data[topicQuestionsIndex];

  return (
    <Container bg_color="">
      <div className="px-[18px] md:px-[24px]">
        <FAQ_INTRO mostQuestions={mostQuestions} />
        <FAQ_COMMENT_QUESTIONS />
        <FAQ_TOPIC_QUESTIONS topicQuestions={topicQuestions} />
      </div>
    </Container>
  );
};

export default Faq;
