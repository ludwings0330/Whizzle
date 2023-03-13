import React, { useState } from "react";
import styled from "styled-components";

//components import
import QuestionStart from "../components/recommend/question/QuestionStart";
import QuestionFilter from "../components/recommend/question/QuestionFilter";
import QuestionExperience from "../components/recommend/question/QuestionExperience";
import QuestionPrice from "../components/recommend/question/QuestionPrice";
import QuestionChooseWhisky from "../components/recommend/question/QuestionChooseWhisky";
import QuestionChooseFlavor from "../components/recommend/question/QuestionChooseFlavor";
import QuestionLoading from "../components/recommend/question/QuestionLoading";

const AppRecommendQuestion = () => {
  // 페이지위치
  const [activePage, setActivePage] = useState(0);

  // 성별과 나이
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  // 구매 가능한 가격
  const [selectedPrice, setSelectedPrice] = useState("");

  // 위스키 경험 여부
  const [isExperience, setIsExperience] = useState("");

  const goNextPage = () => {
    setActivePage((prevPage) => prevPage + 1);
  };
  const goPriorPage = () => {
    setActivePage((prevPage) => prevPage - 1);
  };

  const recommendQuestionPages = () => {
    switch (activePage) {
      case 0:
        return <QuestionStart goNextPage={goNextPage} />;
      case 1:
        return (
          <QuestionFilter
            goNextPage={goNextPage}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedAge={selectedAge}
            setSelectedAge={setSelectedAge}
          />
        );
      case 2:
        return (
          <QuestionPrice
            goPriorPage={goPriorPage}
            goNextPage={goNextPage}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
        );
      case 3:
        return (
          <QuestionExperience
            goPriorPage={goPriorPage}
            goNextPage={goNextPage}
            setActivePage={setActivePage}
            isExperience={isExperience}
            setIsExperience={setIsExperience}
          />
        );
      case 4:
        return <QuestionChooseWhisky />;
      case 5:
        return <QuestionChooseFlavor />;
      case 6:
        return <QuestionLoading />;
    }
  };

  return <div>{recommendQuestionPages()}</div>;
};

export default AppRecommendQuestion;
