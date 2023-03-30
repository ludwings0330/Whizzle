import React, { useEffect } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../assets/img/lotties/error-bear.json";
// import animationData from "../assets/img/lotties/drinking-bear.json";
import { changeHeader, rollbackHeader } from "../hooks/changeHeader";

const SDiv = styled.div`
  display: flex;
  margin-top: 70px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const STitle = styled.div`
  color: #181818;
  font-weight: bold;
  font-size: 100px;
`;

const SText = styled.div`
  color: #181818;
  // font-weight: bold;
  font-size: 20px;
`;

const AppError = () => {
  // 페이지 mount시 네비게이션 바 이미지와 글씨 색 변경
  useEffect(() => {
    changeHeader();
    return () => {
      rollbackHeader();
    };
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <SDiv>
      <STitle>404</STitle>
      <SText>존재하지 않는 페이지입니다.</SText>
      <SText style={{ marginBottom: "15px" }}>오신 김에 귀여운 곰돌이 한마리 보고 가세요.</SText>
      <Lottie options={defaultOptions} height={600} width={600} />
    </SDiv>
  );
};

export default AppError;
