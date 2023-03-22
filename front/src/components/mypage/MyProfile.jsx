import React from "react";
import styled from "styled-components";
import MyLevel from "./MyLevel";

const SImg = styled.img`
  height: 300px;
`;

const SP = styled.p`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const SInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;
  margin-bottom: 50px;
  margin-left: 50px;
`;

const SMainDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

//마이페이지 상단 해당 유저의 기본 정보
const MyProfile = (props) => {
  const user = props.user;
  const level = props.user.level;

  return (
    <>
      <SMainDiv>
        <SImg src={require(`../../${user.image.url}`)} alt={user.name} />
        <SInfoDiv>
          <SP>{user.nickname}</SP>
          <MyLevel level={level} max={100} />
        </SInfoDiv>
      </SMainDiv>
    </>
  );
};

export default MyProfile;
