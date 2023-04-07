import React, { useEffect } from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import animationData from "../assets/img/lotties/error-bear.json";
import { useRecoilValue } from "recoil";
import { showAllState } from "../store/indexStore";
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
  font-size: 20px;
`;

const AppError = () => {
  // 페이지 mount시 네비게이션 바 이미지와 글씨 색 변경
  const showAll = useRecoilValue(showAllState);
  useEffect(() => {
    changeHeader();
    return () => {
      rollbackHeader();
    };
  }, [showAll]);

  return (
    <SDiv>
      <STitle>404</STitle>
      <SText>존재하지 않는 페이지입니다.</SText>
      <SText style={{ marginBottom: "15px" }}>주소를 다시 한번 확인해주세요 :)</SText>
      <Lottie animationData={animationData} style={{ height: "600px" }} />
    </SDiv>
  );
};

export default AppError;
