import React, { useEffect } from "react";
import styled from "styled-components";
import { changeHeader, rollbackHeader } from "../hooks/changeHeader";

const SDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const AppError = () => {
  // 페이지 mount시 네비게이션 바 이미지와 글씨 색 변경
  useEffect(() => {
    changeHeader();
    return () => {
      rollbackHeader();
    };
  }, []);

  return (
    <SDiv>
      <h1>에러페이지</h1>
    </SDiv>
  );
};

export default AppError;
