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
      <STitle>상단에 태그를</STitle>
      <STitle>각각 최소 하나씩 클릭하세요</STitle>
    </SDiv>
  );
};

export default DailyExplain;
