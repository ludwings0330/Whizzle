import React from "react";
import styled from "styled-components";

const SDiv = styled.div`
  height: 25vh;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const STitle = styled.span`
  margin-top: 0;
  text-align: center;
  color: #666666;
  font-size: 18px;
  font-weight: bold;
`;

const DailyExplain = () => {
  return (
    <SDiv>
      <STitle style={{ marginBottom: "6px" }}>상단 태그를 선택해주세요</STitle>
      <STitle>가격은 필수 선택입니다</STitle>
    </SDiv>
  );
};

export default DailyExplain;
