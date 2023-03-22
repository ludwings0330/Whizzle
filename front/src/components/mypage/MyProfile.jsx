import React from "react";
import styled from "styled-components";

const SImg = styled.img`
  height: 365px;
`;

//마이페이지 상단 해당 유저의 기본 정보
const MyProfile = (props) => {
  const user = props.user;

  return (
    <>
      <SImg src={require(`../../${user.image.url}`)} alt={user.name} />
      <p>{user.nickname}</p>
      <p>{user.level}</p>
    </>
  );
};

export default MyProfile;
