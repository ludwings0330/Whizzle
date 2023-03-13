import React from "react";

//import components
import DiaryCalander from "../components/diary/DiaryCalander";
import DiaryInputBox from "../components/diary/input/DiaryInputBox";

const AppDiary = () => {
  return (
    <>
      <h1>다이어리 페이지</h1>
      <DiaryCalander />
      <DiaryInputBox />
    </>
  );
};

export default AppDiary;
