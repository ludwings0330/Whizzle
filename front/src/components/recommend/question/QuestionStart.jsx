import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import loginBackground from "../../../assets/img/loginBackground.png";

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${loginBackground});
  background-repeat: no-repeat;
`;

const STitle = styled.p`
  margin-top: 10vh;
  margin-bottom: 0;
  text-align: center;
  font-size: ${(props) => (props.isMobile ? "1.7rem" : "32px")};
  font-weight: bold;
  color: white;
`;

const SContent = styled.p`
  text-align: center;
  font-size: ${(props) => (props.isMobile ? "1rem" : "20px")};
  color: white;
`;

const SButton = styled.button`
  cursor: pointer;
  display: block;
  margin: 4vh auto;
  width: 300px;
  height: 74px;
  border: none;
  border-radius: 999px;
  font-size: 18px;
  font-family: "Pretendard Variable";
  font-weight: bold;
  background: white;
`;

const SButtonText = styled.span`
  font-size: 18px;
  font-family: "Pretendard Variable";
  font-weight: bold;
  background-image: linear-gradient(125.02deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const QuestionStart = (props) => {
  const isMobile = props.isMobile;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <STitle isMobile={isMobile}>나만의 취향 찾기, 위스키 추천</STitle>
      <SContent isMobile={isMobile}>
        매일 똑같은 소주, 맥주가 지겹다면?
        <br />
        나의 취향에 꼭 맞는 위스키를 추천받아 보세요!
      </SContent>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <SButton onClick={props.goNextPage}>
          <SButtonText>내 취향 정보 입력하기</SButtonText>
        </SButton>
      </motion.div>
    </motion.div>
  );
};

export default QuestionStart;
