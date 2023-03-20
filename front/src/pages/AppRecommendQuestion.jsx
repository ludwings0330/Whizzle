import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { preference } from "../store/preferenceStore";
import { motion, AnimatePresence } from "framer-motion";
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
  // position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-image: linear-gradient(
    90deg,
    #f84f5a 28.12%,
    #f7875a 65.62%,
    #f7cb5a 100%
  );
`;

const slider = {
  // position: "absolute",
  display: "flex",
  minHeight: "100vh",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const SPrevNavigate = styled.div`
  cursor: pointer;
  position: fixed;
  top: 43.25%;
  left: 0%;
  display: ${(props) =>
    props.activePage === 0 || props.activePage === 1 || props.activePage === 6
      ? "none"
      : ""};
`;

const SNextNavigate = styled.div`
  cursor: pointer;
  position: fixed;
  top: 43.25%;
  right: 0%;
  display: ${(props) =>
    props.activePage === 0 ||
    props.activePage === 4 ||
    props.activePage === 5 ||
    props.activePage === 6
      ? "none"
      : ""};
`;

const AppRecommendQuestion = () => {
  const [preferenceValue, setPreferenceValue] = useRecoilState(preference);
  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState("next");

  const goNextPage = () => {
    if (activePage === 1 && !(preferenceValue.age && preferenceValue.gender)) {
      alert("해당되는 내용을 선택해주세요!");
    } else if (activePage === 2 && !preferenceValue.price) {
      alert("해당되는 내용을 선택해주세요!");
    } else if (activePage === 3 && !preferenceValue.isExperience) {
      alert("해당되는 내용을 선택해주세요!");
    } else if (activePage === 3 && preferenceValue.isExperience === "true") {
      setDirection("next");
      setActivePage(4);
    } else if (activePage === 3 && preferenceValue.isExperience === "false") {
      setDirection("next");
      setActivePage(5);
    } else if (activePage === 4 && !preferenceValue.whiskies) {
      alert("1개 이상의 위스키를 선택해주세요!");
    } else {
      setDirection("next");
      setActivePage((prev) => (activePage === 4 ? prev + 2 : prev + 1));
    }
  };
  const goPrevPage = () => {
    setDirection("prev");
    setActivePage((prev) => (activePage === 5 ? prev - 2 : prev - 1));
  };

  const pageVariants = {
    hidden: function (direction) {
      return {
        x: direction === "next" ? 500 : -500,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.75 },
      };
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.75, delay: 0.75 },
    },
    exit: function (direction) {
      return {
        x: direction === "next" ? -500 : 500,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.75 },
      };
    },
  };

  const recommendQuestionPages = () => {
    switch (activePage) {
      case 0:
        return <QuestionStart goNextPage={goNextPage} />;
      case 1:
        return (
          <QuestionFilter
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
          />
        );
      case 2:
        return (
          <QuestionPrice
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
          />
        );
      case 3:
        return (
          <QuestionExperience
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
          />
        );
      case 4:
        return (
          <QuestionChooseWhisky
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
          />
        );
      case 5:
        return (
          <QuestionChooseFlavor
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
          />
        );
      case 6:
        return (
          <QuestionLoading
            key={activePage}
            direction={direction}
            pageVariants={pageVariants}
            setActivePage={setActivePage}
            setDirection={setDirection}
          />
        );
    }
  };

  return (
    <SDiv>
      <motion.div style={slider}>
        <AnimatePresence custom={direction}>
          {recommendQuestionPages()}
        </AnimatePresence>
      </motion.div>
      <SPrevNavigate activePage={activePage} onClick={goPrevPage}>
        <img src={navigatePrev} alt="navigate" />
      </SPrevNavigate>
      <SNextNavigate activePage={activePage} onClick={goNextPage}>
        <img src={navigateNext} alt="navigate" />
      </SNextNavigate>
    </SDiv>
  );
};

export default AppRecommendQuestion;
