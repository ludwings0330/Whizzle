import React from "react";
import styled from "styled-components";
import WhiskySimilarListItem from "./WhiskySimilarListItem";

const SContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
`;

const SDiv = styled.div`
  width: 990px;
`;

const SP = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const SListDiv = styled.div`
  width: 990px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  align-items: flex-start;

  & > * {
    :not(:last-child) {
      margin-right: 10px;
    }
  }
`;

//유사한 위스키 추천 리스트
const WhiskySimilarList = () => {
  return (
    <SContainer>
      <SDiv>
        <SP>이런 위스키는 어떠세요?</SP>
        <SListDiv>
          <WhiskySimilarListItem /> {/*재사용 컴포넌트로 다른 곳에서 만들 예정, 일단 임시로 만듬*/}
          <WhiskySimilarListItem />
          <WhiskySimilarListItem />
        </SListDiv>
      </SDiv>
    </SContainer>
  );
};

export default WhiskySimilarList;
