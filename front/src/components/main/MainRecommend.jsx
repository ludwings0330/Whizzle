import React from "react";
import styled from "styled-components";
import main3 from "../../assets/img/main3.png";

const SImg = styled.div`
  height: 100vh;
  background-image: url(${main3});
`;

//메인화면에 띄워줄 추천부분(비로그인 사용자)
const MainRecommend = () => {
  return (
    <>
      <SImg />
    </>
  );
};

export default MainRecommend;
