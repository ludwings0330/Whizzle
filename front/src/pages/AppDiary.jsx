import React from "react";
import styled from "styled-components";

//import components
import DiaryCalander from "../components/diary/calander/DiaryCalander";
import DiaryInput from "../components/diary/input/DiaryInput";

//import image
import diary_header from "../assets/img/diary_header.png";

const SHeaderDiv = styled.div`
  width: 100vw;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${diary_header});
  background-repeat: no-repeat;
`;

const SMainDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
`;

const SP = styled.p`
  font-size: 22px;
  color: white;
  margin: 5px;
`;

const AppDiary = () => {
  return (
    <>
      <SHeaderDiv>
        <SP
          style={{ fontSize: "40px", marginTop: "50px", marginBottom: "15px", fontWeight: "bold" }}
        >
          기억을 기록하다, 위스키 다이어리
        </SP>
        <SP>매일을 특별하게 남기고 싶은 당신을 위해,</SP>
        <SP>오늘의 위스키에 감정을 담아보세요!</SP>
      </SHeaderDiv>
      <SMainDiv>
        <DiaryCalander />
        <DiaryInput />
      </SMainDiv>
    </>
  );
};

export default AppDiary;
