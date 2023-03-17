import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { preference } from "../../../store/preferenceStore";
import QuestionChooseFlavorItem from "./QuestionChooseFlavorItem";
import styled from "styled-components";
import { motion } from "framer-motion";
import navigatePrev from "../../../assets/img/navigate_prev.png";
import infoImg from "../../../assets/img/info.png";

const SDiv = styled.div`
  display: flex;
  justify-content: center;
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

const STitle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: white;
`;

const SImg = styled.img``;

const SInfo = styled.div`
  position: absolute;
  text-align: left;
  top: 5px;
  left: 102%;
  min-width: 460px;
  padding: 15px 20px;
  gap: 10px;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-weight: normal;
  font-size: 18px;
  color: #212121;
  display: ${(props) => (props.hover ? "block" : "none")};
`;

const SBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0px 20px;
  flex-wrap: wrap;
  max-width: 800px;
  // height: 284px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  margin-bottom: 70px;
  padding: 20px;
`;

const SButton = styled.button`
  cursor: pointer;
  display: block;
  width: 464px;
  height: 80px;
  border: none;
  border-radius: 999px;
  background: white;
`;

const SButtonText = styled.span`
  font-size: 18px;
  font-family: "Pretendard Variable";
  font-weight: bold;
  background-image: linear-gradient(
    125.02deg,
    #f84f5a 28.12%,
    #f7875a 65.62%,
    #f7cb5a 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  const [isHover, setIsHover] = useState(false);

  const priorPageHandler = () =>
    setTimeout(() => {
      props.setActivePage(3);
    }, 300);

  const submitHandler = () => {
    // axios 요청 들어갈 자리
    console.log(preferenceValue);
    setTimeout(() => {
      props.setActivePage(6);
    }, 300);
  };

  return (
    <motion.div
      variants={props.pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={props.direction}
    >
      <SCentered>
        <SContent>입맛에 맞는 위스키를 추천해드릴게요!</SContent>
        <STitle>
          선호하는 flavor 태그를 선택해주세요. &nbsp;
          <SImg
            src={infoImg}
            alt="info.png"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          />
          <SInfo hover={isHover}>
            해당 맛을 선호하는만큼 클릭해주세요
            <br />
            최대 4번까지 클릭 가능하며 클릭 수만큼 테두리 색이 진해집니다
          </SInfo>
        </STitle>
        <SBox>
          {flavorPresetData.map((flavor, index) => (
            <QuestionChooseFlavorItem key={index} flavor={flavor} />
          ))}
        </SBox>
        <SButton onClick={submitHandler}>
          <SButtonText>나만의 위스키 추천 결과 보러가기</SButtonText>
        </SButton>
      </SCentered>
    </motion.div>
  );
};

export default QuestionChooseFlavor;
