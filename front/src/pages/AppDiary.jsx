import React from "react";
import { Route, Routes } from "react-router-dom";
import DiaryCalander from "../components/diary/DiaryCalander";
import DiaryInputModal from "../components/diary/DiaryInputModal";

const AppDiary = () => {
  return (
    <>
      <h1>다이어리 페이지</h1>
      <Routes>
        <Route path="/calander" element={<DiaryCalander />} />
        <Route path="/modal" element={<DiaryInputModal />} />
      </Routes>
    </>
  );
};

export default AppDiary;
