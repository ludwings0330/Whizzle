import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import styled from "styled-components";
import navigateNext from "../assets/img/navigate_next.png";
import navigatePrev from "../assets/img/navigate_prev.png";

//components import
import QuestionStart from "../components/recommend/question/QuestionStart";
import QuestionFilter from "../components/recommend/question/QuestionFilter";
import QuestionExperience from "../components/recommend/question/QuestionExperience";
import QuestionPrice from "../components/recommend/question/QuestionPrice";
import QuestionChooseWhisky from "../components/recommend/question/QuestionChooseWhisky";
import QuestionChooseFlavor from "../components/recommend/question/QuestionChooseFlavor";
import QuestionLoading from "../components/recommend/question/QuestionLoading";

const SDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: linear-gradient(
    125.02deg,
    #f84f5a 28.12%,
    #f7875a 65.62%,
    #f7cb5a 100%
  );
`;

const SNavigate = styled.div`
  cursor: pointer;
  position: fixed;
`;

const AppRecommendQuestion = () => {
  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState("next");
  const [xValue, setXValue] = useState(0);
  const x = useMotionValue(xValue);

  const goNextPage = () => {
    setDirection("next");
    setActivePage((prev) => prev + 1);
  };
  const goPriorPage = () => {
    setDirection("prev");
    setActivePage((prev) => prev - 1);
  };

  const pageVariants = {
    hidden: function (direction) {
      return {
        x: direction === "next" ? 500 : -500,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.3 },
      };
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: function (direction) {
      return {
        x: direction === "next" ? -500 : 500,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.3 },
      };
    },
  };

  const recommendQuestionPages = () => {
    switch (activePage) {
      case 0:
        return <QuestionStart />;
      case 1:
        return (
          <QuestionFilter
            direction={direction}
            pageVariants={pageVariants}
            goNextPage={goNextPage}
          />
        );
      case 2:
        return (
          <QuestionPrice
            direction={direction}
            pageVariants={pageVariants}
            goNextPage={goNextPage}
          />
        );
      case 3:
        return (
          <QuestionExperience
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
          />
        );
      case 4:
        return (
          <QuestionChooseWhisky
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
          />
        );
      case 5:
        return (
          <QuestionChooseFlavor
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
          />
        );
      case 6:
        return <QuestionLoading />;
    }
  };

  return (
    <SDiv>
      <AnimatePresence custom={direction}>
        {recommendQuestionPages()}
      </AnimatePresence>
      <SNavigate onClick={goPriorPage} style={{ left: "0%" }}>
        <img src={navigatePrev} alt="navigate" />
      </SNavigate>
      <SNavigate onClick={goNextPage} style={{ right: "0%" }}>
        <img src={navigateNext} alt="navigate" />
      </SNavigate>
    </SDiv>
  );
};

export default AppRecommendQuestion;
