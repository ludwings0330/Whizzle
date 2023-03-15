import React from "react";
import { useRecoilValue } from "recoil";
import { preference } from "../../../store/preferenceStore";
import QuestionChooseFlavorItem from "./QuestionChooseFlavorItem";
import styled from "styled-components";

const SDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(
    125.02deg,
    #f84f5a 28.12%,
    #f7875a 65.62%,
    #f7cb5a 100%
  );
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
  "body",
  "rich",
  "sweet",
  "salty",
  "vanilla",
  "tart",
  "fruity",
  "floral",
];

//추천 -> 초급자 용 맛 선호도 질문
const QuestionChooseFlavor = (props) => {
  const preferenceValue = useRecoilValue(preference);

  const priorPageHandler = () => props.setActivePage(3);

  const submitHandler = () => {
    // axios 요청 들어갈 자리
    console.log(preferenceValue);
    props.setActivePage(6);
  };

  return (
    <SDiv>
      <button onClick={priorPageHandler}>이전</button>
      <SCentered>
        <SContent>입맛에 맞는 위스키를 추천해드릴게요!</SContent>
        <STitle>선호하는 flavor 태그를 선택해주세요.</STitle>
        <SBox>
          {flavorPresetData.map((flavor, index) => (
            <QuestionChooseFlavorItem key={index} flavor={flavor} />
          ))}
        </SBox>
        <SButton onClick={submitHandler}>
          나만의 위스키 추천 결과 보러가기
        </SButton>
      </SCentered>
      <div></div>
    </SDiv>
  );
};

export default QuestionChooseFlavor;
