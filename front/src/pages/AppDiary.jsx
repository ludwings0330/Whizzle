import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

//import component
import DiaryCalander from "../components/diary/calander/DiaryCalander";
import DiaryEditor from "../components/diary/input/DiaryEditor";

//import image
import diary_header from "../assets/img/diary_header.png";

//import recoil
import { userState } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { warning } from "../components/notify/notify";

const SHeaderDiv = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${diary_header}) center center / cover no-repeat;
`;

const SMainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  margin-bottom: 120px;
`;

const SHeaderDivider = styled.div`
  height: 3px;

  @media only screen and (max-height: 768px) and (-webkit-min-device-pixel-ratio: 1.25),
    only screen and (max-height: 768px) and (min-resolution: 120dpi),
    only screen and (max-height: 768px) and (min-resolution: 1.25dppx) {
    height: 15px;
  }
`;

const SP = styled.p`
  font-size: 18px;
  color: white;
  margin: 0px;
`;

const AppDiary = () => {
  let [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (!user.id) {
      warning("로그인이 필요한 페이지 입니다.");
      navigate("/signin");
    }
  });

  return (
    <>
      {user.id ? (
        <>
          <SHeaderDiv>
            <SP
              style={{
                fontSize: "32px",
                paddingTop: "40px",
                marginBottom: "18px",
                fontWeight: "bold",
              }}
            >
              기억을 기록하다, 위스키 다이어리
            </SP>
            <SP>매일을 특별하게 남기고 싶은 당신을 위해,</SP>
            <SP>오늘의 위스키에 감정을 담아보세요!</SP>
          </SHeaderDiv>
          <SHeaderDivider />
          <SMainDiv>
            <DiaryCalander setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
            <DiaryEditor selectedDate={selectedDate} />
          </SMainDiv>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AppDiary;
