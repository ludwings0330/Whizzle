import React, { useState } from "react";
import styled from "styled-components";
import QuestionChooseFlavorItem from "./QuestionChooseFlavorItem";

const SDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90vh;
  background: #f84f5a;
`;

const SCentered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SContent = styled.p`
  margin-bottom: 10px;
  text-align: center;
  font-size: 24px;
  color: white;
`;

const STitle = styled.p`
  margin-top: 0;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: white;
`;

const SBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0px 20px;
  flex-wrap: wrap;
  width: 800px;
  height: 284px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  margin-bottom: 95px;
  padding: 20px;
`;

const SButton = styled.button`
  cursor: pointer;
  display: block;
  width: 464px;
  height: 80px;
  border: none;
  border-radius: 999px;
  font-size: 18px;
  font-family: "Pretendard Variable";
`;

const flavorPresetData = [
  "smoky",
  "peaty",
  "spicy",
  "herbal",
  "oily",
  "full bodied",
  "rich",
  "sweet",
  "briny/salty",
  "vanilla",
  "tart",
  "fruity",
  "floral",
];

//추천 -> 초급자 용 맛 선호도 질문
const QuestionChooseFlavor = (props) => {
  const priorPageHandler = () => props.setActivePage(3);

  const nextPageHandler = () => {
    if (props.selectedWhisky.length > 0) {
      props.setActivePage(6);
    } else {
      alert("1개 이상의 위스키를 선택해주세요!");
    }
  };

  return (
    <SDiv>
      <button onClick={priorPageHandler}>이전</button>
      <SCentered>
        <SContent>입맛에 맞는 위스키를 추천해드릴게요!</SContent>
        <STitle>선호하는 flavor 태그를 선택해주세요.</STitle>
        <SBox>
          {flavorPresetData.map((flavor, index) => (
            <QuestionChooseFlavorItem
              key={index}
              flavor={flavor}
              selectedFlavor={props.selectedFlavor}
              setSelectedFlavor={props.setSelectedFlavor}
            />
          ))}
        </SBox>
        <SButton onClick={nextPageHandler}>
          나만의 위스키 추천 결과 보러가기
        </SButton>
      </SCentered>
      <div></div>
    </SDiv>
  );
};

export default QuestionChooseFlavor;
