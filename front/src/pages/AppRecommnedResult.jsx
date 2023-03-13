import React from "react";

//import components
import ResultGraph from "../components/recommend/result/ResultGraph";
import ResultMainWhisky from "../components/recommend/result/ResultMainWhisky";
import ResultWhiskyList from "../components/recommend/result/ResultWhiskyList";

//추천 결과 페이지
const AppRecommnedResult = () => {
  return (
    <>
      <h1>추천된 결과를 보여준다</h1>
      <ResultGraph />
      <ResultMainWhisky />
      <ResultWhiskyList />
    </>
  );
};

export default AppRecommnedResult;
