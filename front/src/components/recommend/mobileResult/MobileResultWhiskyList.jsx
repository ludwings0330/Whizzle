import React, { useState } from "react";
import MobileWhiskyListItem from "../../common/MobileWhiskyListItem";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
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
  height: 55vh;
`;

const SSimilarP = styled.p`
  margin-top: 0px;
  margin-bottom: 3vh;
  font-family: "Pacifico";
  display: inline-block;
  font-weight: 400;
  font-size: 2.5rem;
  color: #636363;
`;

const SBtn = styled.button`
  width: 22vw;
  height: 12vw;
  font-family: "Pretendard Variable";
  border: 1px solid #a2a2a2;
  border-radius: 10px;
  color: #9b9b9b;
  font-size: 1rem;
  background-color: transparent;
  cursor: pointer;
  margin-top: 0.5vh;

  :hover {
    background-color: rgba(155, 155, 155, 0.2);
    color: rgba(0, 0, 0, 0.8);
  }
`;

//추천 위스키 리스트 목록
const MobileResultWhiskyList = (props) => {
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
                <MobileWhiskyListItem whisky={whisky} />
              </SSimilarDiv>
            );
          })}
        {!seeMore ? <SBtn onClick={onClickHandler}>더 보기</SBtn> : null}
      </SDiv>
    </Wrapper>
  );
};

export default MobileResultWhiskyList;
