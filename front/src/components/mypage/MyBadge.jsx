import React from "react";
import styled from "styled-components";
import MyBadgeItem from "./MyBadgeItem";

const SBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: 20px 30px;
  flex-wrap: wrap;
  max-width: 730px;
  background: #ffffff;
  border: 1px solid #b9b9b9;
  border-radius: 10px;
  margin-bottom: 70px;
  margin-top: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 50px;
  padding-right: 50px;
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
