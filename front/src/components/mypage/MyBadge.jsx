import React, { useState } from "react";
import styled from "styled-components";
import MyBadgeItem from "./MyBadgeItem";

const SBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0px 20px;
  flex-wrap: wrap;
  max-width: 800px;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  border-radius: 16px;
  margin-bottom: 70px;
  margin-top: 100px;
  padding: 40px;
`;

const exampleBadges = [
  {
    url: "assets/img/badge1.png",
    description: "1번째 다이어리 작성을 축하합니다. 앞으로 달아오를 달력이 기대되네요!",
    achieveDate: "2023-03-17T06:13:48",
  },
  {
    url: "assets/img/badge2.png",
    description: "1번째 다이어리 작성을 축하합니다. 앞으로 달아오를 달력이 기대되네요!",
    achieveDate: "2023-03-17T06:13:48",
  },
  {
    url: "assets/img/badge3.png",
    description: "1번째 다이어리 작성을 축하합니다. 앞으로 달아오를 달력이 기대되네요!",
    achieveDate: "2023-03-17T06:13:48",
  },
  {
    url: "assets/img/badge4.png",
    description: "1번째 다이어리 작성을 축하합니다. 앞으로 달아오를 달력이 기대되네요!",
    achieveDate: "2023-03-17T06:13:48",
  },
  {
    url: "assets/img/badge5.png",
    description: "1번째 다이어리 작성을 축하합니다. 앞으로 달아오를 달력이 기대되네요!",
    achieveDate: "2023-03-17T06:13:48",
  },
  {
    url: "assets/img/badge6.png",
    description: "1번째 다이어리 작성을 축하합니다. 앞으로 달아오를 달력이 기대되네요!",
    achieveDate: "2023-03-17T06:13:48",
  },
  {
    url: "assets/img/badge7.png",
    description: "1번째 다이어리 작성을 축하합니다. 앞으로 달아오를 달력이 기대되네요!",
    achieveDate: "2023-03-17T06:13:48",
  },
];

//마이페이지 뱃지
const MyBadge = () => {
  return (
    <>
      <SBox>
        {exampleBadges.map((badge, index) => (
          <MyBadgeItem key={index} badge={badge} />
        ))}
      </SBox>
    </>
  );
};

export default MyBadge;
