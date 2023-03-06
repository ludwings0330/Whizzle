import React from "react";
import { Route, Routes } from "react-router-dom";
import WhiskyDetailInfo from "../components/whisky/WhiskyDetailInfo";
import WhiskyDetailReview from "../components/whisky/WhiskyDetailReview";
import WhiskyReviewCreate from "../components/whisky/WhiskyReviewCreate";
import WhiskySilmilarList from "../components/whisky/WhiskySilmilarList";

const AppWhisky = () => {
  return (
    <>
      <h1>위스키정보페이지</h1>
      <Routes>
        <Route path="/detail/info" element={<WhiskyDetailInfo />} />
        <Route path="/detail/review" element={<WhiskyDetailReview />} />
        <Route path="/detail/silmilar" element={<WhiskySilmilarList />} />
        <Route path="/review/create" element={<WhiskyReviewCreate />} />
      </Routes>
    </>
  );
};

export default AppWhisky;
