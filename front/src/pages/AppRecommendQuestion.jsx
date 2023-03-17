import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

//components import
import QuestionStart from "../components/recommend/question/QuestionStart";
import QuestionFilter from "../components/recommend/question/QuestionFilter";
import QuestionExperience from "../components/recommend/question/QuestionExperience";
import QuestionPrice from "../components/recommend/question/QuestionPrice";
import QuestionChooseWhisky from "../components/recommend/question/QuestionChooseWhisky";
import QuestionChooseFlavor from "../components/recommend/question/QuestionChooseFlavor";
import QuestionLoading from "../components/recommend/question/QuestionLoading";

const AppRecommendQuestion = () => {
  // 페이지 위치
  const [activePage, setActivePage] = useState(0);

  // 페이지 이동하는 함수
  const goNextPage = () => {
    setTimeout(() => {
      // 1초 후 페이지 이동
      setActivePage((prevPage) => prevPage + 1);
    }, 300);
  };
  const goPriorPage = () => {
    setTimeout(() => {
      // 1초 후 페이지 이동
      setActivePage((prevPage) => prevPage - 1);
    }, 300);
  };

  const recommendQuestionPages = () => {
    switch (activePage) {
      case 0:
        return <QuestionStart goNextPage={goNextPage} />;
      case 1:
        return <QuestionFilter goNextPage={goNextPage} />;
      case 2:
        return (
          <QuestionPrice goPriorPage={goPriorPage} goNextPage={goNextPage} />
        );
      case 3:
        return (
          <QuestionExperience
            goPriorPage={goPriorPage}
            setActivePage={setActivePage}
          />
        );
      case 4:
        return (
          <QuestionChooseWhisky
            goPriorPage={goPriorPage}
            setActivePage={setActivePage}
          />
        );
      case 5:
        return <QuestionChooseFlavor setActivePage={setActivePage} />;
      case 6:
        return <QuestionLoading />;
    }
  };

  return <AnimatePresence>{recommendQuestionPages()}</AnimatePresence>;
};

export default AppRecommendQuestion;
