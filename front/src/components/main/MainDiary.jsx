import React from "react";
import styled from "styled-components";
import main2 from "../../assets/img/main2.png";

const SImg = styled.div`
  height: 100vh;
  background-image: url(${main2});
`;

//메인화면에 띄워줄 다이어리
const MainDiary = () => {
  return (
    <>
      <SImg />
    </>
  );
};

export default MainDiary;
