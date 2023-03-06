import React from "react";
import { Route, Routes } from "react-router-dom";

//components import
import QuestionAlcohol from "../components/recommend/question/QuestionAlcohol";
import QuestionExperience from "../components/recommend/question/QuestionExperience";
import QuestionFilter from "../components/recommend/question/QuestionFilter";
import QuestionLoading from "../components/recommend/question/QuestionLoading";
import ResultGraph from "../components/recommend/result/ResultGraph";
import ResultMainWhisky from "../components/recommend/result/ResultMainWhisky";
import ResultWhiskyList from "../components/recommend/result/ResultWhiskyList";

const AppRecommend = () => {
  return (
    <>
      <h1>추천페이지</h1>
      <Routes>
        <Route path="/question/alcohol" element={<QuestionAlcohol />} />
        <Route path="/question/experience" element={<QuestionExperience />} />
        <Route path="/question/filter" element={<QuestionFilter />} />
        <Route path="/question/loading" element={<QuestionLoading />} />
        <Route path="/result/graph" element={<ResultGraph />} />
        <Route path="/result/mainwhisky" element={<ResultMainWhisky />} />
        <Route path="/result/whiskylist" element={<ResultWhiskyList />} />
      </Routes>
    </>
  );
};

export default AppRecommend;
