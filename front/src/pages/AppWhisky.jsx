import React from "react";

//import components
import WhiskyDetailInfo from "../components/whisky/WhiskyDetailInfo";
import WhiskyDetailReview from "../components/whisky/WhiskyDetailReview";
import WhiskySilmilarList from "../components/whisky/WhiskySilmilarList";

const AppWhisky = () => {
  return (
    <>
      <h1>위스키정보페이지</h1>
      <WhiskyDetailInfo />
      <WhiskyDetailReview />
      <WhiskySilmilarList />
    </>
  );
};

export default AppWhisky;
