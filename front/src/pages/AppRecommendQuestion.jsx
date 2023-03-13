import React from "react";
import { Route, Routes } from "react-router-dom";

//components import
import QuestionExperience from "../components/recommend/question/QuestionExperience";
import QuestionFilter from "../components/recommend/question/QuestionFilter";
import QuestionLoading from "../components/recommend/question/QuestionLoading";
import QuestionPrice from "../components/recommend/question/QuestionPrice";
import QuestionChooseFlavor from "../components/recommend/question/QuestionChooseFlavor";
import QuestionChooseWhisky from "../components/recommend/question/QuestionChooseWhisky";

const AppRecommendQuestion = () => {
  return (
    <>
      <h1>추천페이지</h1>
      <Routes>
        <Route path="experience" element={<QuestionExperience />} />
        <Route path="filter" element={<QuestionFilter />} />
        <Route path="loading" element={<QuestionLoading />} />
        <Route path="price" element={<QuestionPrice />} />
        <Route path="choosewhisky" element={<QuestionChooseWhisky />} />
        <Route path="chooseflavor" element={<QuestionChooseFlavor />} />
      </Routes>
    </>
  );
};

export default AppRecommendQuestion;
