import React from "react";
import styled from "styled-components";

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const STitle = styled.p`
  margin-top: 0;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

//추천 후 로딩
const QuestionLoading = () => {
  return (
    <SDiv>
      <STitle>당신의 취향을 분석 중이에요!</STitle>
    </SDiv>
  );
};

export default QuestionLoading;
