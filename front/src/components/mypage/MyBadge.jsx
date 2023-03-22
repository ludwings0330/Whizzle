import React from "react";
import styled from "styled-components";

const SBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0px 20px;
  flex-wrap: wrap;
  max-width: 800px;
  // height: 284px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  margin-bottom: 70px;
  padding: 20px;
`;

//마이페이지 뱃지
const MyBadge = () => {
  return (
    <>
      <SBox></SBox>
    </>
  );
};

export default MyBadge;
