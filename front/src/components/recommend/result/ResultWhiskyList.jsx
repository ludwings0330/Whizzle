import React, { useState } from "react";
import WhiskyListItem from "../../common/WhiskyListItem";
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
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 100px;
  flex-wrap: wrap;

  & > * {
    :not(:last-child) {
      margin-right: 10px;
    }
  }
`;

const SSimilarDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SSimilarP = styled.p`
  margin-top: 0px;
  margin-bottom: 20px;
  font-family: "Pacifico";
  display: inline-block;
  font-weight: 400;
  font-size: 48px;
  color: #636363;
`;

const SBtn = styled.button`
  width: 257px;
  height: 64px;
  font-family: "Pretendard Variable";
  border: 1px solid #a2a2a2;
  border-radius: 10px;
  color: #9b9b9b;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  margin-top: 50px;

  :hover {
    background-color: rgba(155, 155, 155, 0.2);
    color: rgba(0, 0, 0, 0.8);
  }
`;

//추천 위스키 리스트 목록
const ResultWhiskyList = (props) => {
  const whiskys = props.whiskys;
  const [seeMore, setSeemore] = useState(false);
  const onClickHandler = () => {
    setSeemore(!seeMore);
  };

  return (
    <Wrapper>
      <SDiv>
        {whiskys.length &&
          seeMore &&
          whiskys.map((whisky, index) => {
            return (
              <SSimilarDiv key={index}>
                <SSimilarP>no.{index + 4}</SSimilarP>
                <WhiskyListItem whisky={whisky} />
              </SSimilarDiv>
            );
          })}
        {!seeMore ? <SBtn onClick={onClickHandler}>더 보기</SBtn> : null}
      </SDiv>
    </Wrapper>
  );
};

export default ResultWhiskyList;
