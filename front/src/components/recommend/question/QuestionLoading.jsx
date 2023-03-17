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
  margin-top: 0;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

//추천 후 로딩
const QuestionLoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <STitle>당신의 취향을 분석 중이에요!</STitle>
    </motion.div>
  );
};

export default QuestionLoading;
