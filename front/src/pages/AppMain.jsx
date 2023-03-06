import React from "react";
import { Route, Routes } from "react-router-dom";

//components import
import MainDiary from "../components/main/MainDiary";
import MainRecommend from "../components/main/MainRecommend";
import MainReview from "../components/main/MainReview";
import MainWhiskyList from "../components/main/MainWhiskyList";

const AppMain = () => {
  return (
    <>
      <h1>메인페이지</h1>
      <Routes>
        <Route path="/main/diary" element={<MainDiary />} />
        <Route path="/main/recommend" element={<MainRecommend />} />
        <Route path="/main/review" element={<MainReview />} />
        <Route path="/main/whiskylist" element={<MainWhiskyList />} />
      </Routes>
    </>
  );
};

export default AppMain;
