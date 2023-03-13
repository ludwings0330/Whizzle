import React from "react";

//components import
import MainDiary from "../components/main/MainDiary";
import MainRecommend from "../components/main/MainRecommend";
import MainReview from "../components/main/MainReview";
import MainWhiskyList from "../components/main/MainWhiskyList";

const AppMain = () => {
  return (
    <>
      <h1>메인페이지</h1>
      <MainDiary />
      <MainRecommend />
      <MainReview />
      <MainWhiskyList />
    </>
  );
};

export default AppMain;
