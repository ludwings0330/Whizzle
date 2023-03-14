import React from "react";

//import components
import DiaryCalander from "../components/diary/DiaryCalander";
import DiaryInput from "../components/diary/input/DiaryInput";

const AppDiary = () => {
  return (
    <>
      <h1>다이어리 페이지</h1>
      <DiaryCalander />
      <DiaryInput />
    </>
  );
};

export default AppDiary;
