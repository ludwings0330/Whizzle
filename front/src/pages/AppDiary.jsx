import React from "react";
import styled from "styled-components";

//import components
import DiaryCalander from "../components/diary/calander/DiaryCalander";
import DiaryInput from "../components/diary/input/DiaryInput";

//import image
import diary_header from "../assets/img/diary_header.png";

const SHeaderImgDiv = styled.div`
  background: url(${diary_header});
  width: 1920px;
  height: 300px;
  background-size: cover;
  position: relative;
`;

const SHeaderTextDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  text-align: center;
  transform: translate(-50%, -50%);
`;

const SMainDiv = styled.div`
  width: 100%;
  height: 1000px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const AppDiary = () => {
  return (
    <>
      <SHeaderImgDiv>
        <SHeaderTextDiv>
          <h1>기억을 기록하다, 위스키 다이어리</h1>
          <h3>매일을 특별하게 남기고 싶은 당신을 위해,</h3>
          <h3>오늘의 위스키에 감정을 담아보세요!</h3>
        </SHeaderTextDiv>
      </SHeaderImgDiv>
      <SMainDiv>
        <DiaryCalander />
        <DiaryInput />
      </SMainDiv>
    </>
  );
};

export default AppDiary;
