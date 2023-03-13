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
  margin-bottom: 0;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
`;

const SContent = styled.p`
  text-align: center;
  font-size: 20px;
`;

const SBotton = styled.button`
  cursor: pointer;
  display: block;
  margin: 2vh auto;
  gap: 10px;
  width: 300px;
  height: 74px;
  border: none;
  border-radius: 999px;
  font-size: 18px;
  font-family: "Pretendard Variable";
`;

const QuestionStart = (props) => {
  return (
    <SDiv>
      <STitle>나만의 취향 찾기, 위스키 추천</STitle>
      <SContent>
        매일 똑같은 소주, 맥주가 지겹다면?
        <br />
        나의 취향에 꼭 맞는 위스키를 추천받아 보세요!
      </SContent>
      <SBotton onClick={props.goNextPage}>내 취향 정보 입력하기</SBotton>
    </SDiv>
  );
};

export default QuestionStart;
