import React from "react";
import WhiskySimilarListItem from "../../whisky/WhiskySimilarListItem";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const SDiv = styled.div`
  width: 990px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  & > * {
    :not(:last-child) {
      margin-right: 10px;
    }
  }
`;

//추천 위스키 리스트 목록
const ResultWhiskyList = () => {
  return (
    <Wrapper>
      <SDiv>
        <WhiskySimilarListItem />
        <WhiskySimilarListItem />
        <WhiskySimilarListItem />
        <WhiskySimilarListItem />
        <WhiskySimilarListItem />
        <WhiskySimilarListItem />
      </SDiv>
    </Wrapper>
  );
};

export default ResultWhiskyList;
