import React from "react";
import styled from "styled-components";
import MyLevel from "./MyLevel";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/userStore";

const SImg = styled.img`
  height: 250px;
  filter: drop-shadow(0px 8px 24px rgba(149, 157, 165, 0.2));
  border-radius: 999px;
`;

const SP = styled.p`
  font-size: 40px;
  font-weight: bold;
  padding-top: 20px;
  margin-bottom: 15px;
`;

const SInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;
  padding-left: 20px;
  margin-bottom: 50px;
  margin-left: 20px;
`;

const SMainDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

//마이페이지 상단 해당 유저의 기본 정보
const MyProfile = () => {
  const user = useRecoilValue(userState);

  return (
    <>
      <SMainDiv>
        <SImg src={`${user.image.url}`} alt={user.name} />
        <SInfoDiv>
          <SP>{user.nickname}</SP>
          <MyLevel level={user.level} max={100} />
        </SInfoDiv>
      </SMainDiv>
    </>
  );
};

export default MyProfile;
