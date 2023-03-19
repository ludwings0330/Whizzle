import React from "react";
import styled from "styled-components";
import main from "../assets/img/main.png";

//components import
import MainDiary from "../components/main/MainDiary";
import MainRecommend from "../components/main/MainRecommend";
import MainReview from "../components/main/MainReview";
import MainWhiskyList from "../components/main/MainWhiskyList";

const SImg = styled.div`
  height: 92vh;
  background-image: url(${main});
`;

const AppMain = () => {
  return (
    <>
      <SImg />
      <MainDiary />
      <MainRecommend />
      <MainReview />
      <MainWhiskyList />
    </>
  );
};

export default AppMain;
