import React, { useState } from "react";

//import css
import styled from "styled-components";

//import component
import DiaryCalander from "../components/diary/calander/DiaryCalander";
import DiaryInput from "../components/diary/input/DiaryInput";
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
  align-items: start;
  min-height: calc(100vh - 300px);
  margin: 30px 0 0 0;

  @media only screen and (max-height: 768px) and (-webkit-min-device-pixel-ratio: 1.25),
    only screen and (max-height: 768px) and (min-resolution: 120dpi),
    only screen and (max-height: 768px) and (min-resolution: 1.25dppx) {
    margin-top: 30px;
  }
`;

const SHeaderDivider = styled.div`
  height: 30px;

  @media only screen and (max-height: 768px) and (-webkit-min-device-pixel-ratio: 1.25),
    only screen and (max-height: 768px) and (min-resolution: 120dpi),
    only screen and (max-height: 768px) and (min-resolution: 1.25dppx) {
    height: 15px;
  }
`;

const SMainDivider = styled.div`
  width: 30px;

  @media only screen and (max-height: 768px) and (-webkit-min-device-pixel-ratio: 1.25),
    only screen and (max-height: 768px) and (min-resolution: 120dpi),
    only screen and (max-height: 768px) and (min-resolution: 1.25dppx) {
    width: 15px;
  }
`;

const SP = styled.p`
  font-size: 22px;
  color: white;
  margin: 5px;
`;

const AppDiary = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10).replaceAll("-", ".")
  );

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
      <SHeaderDivider />
      <SMainDiv>
        <SMainDivider />
        <DiaryCalander onDateClick={setSelectedDate} />
        <DiaryInput selectedDate={selectedDate} />
      </SMainDiv>
    </>
  );
};

export default AppDiary;
