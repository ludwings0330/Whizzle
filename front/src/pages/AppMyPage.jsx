import React, { useEffect } from "react";
import styled from "styled-components";
import { changeHeader, rollbackHeader } from "../hooks/changeHeader";

//components import
import MyBadge from "../components/mypage/MyBadge";
import MyProfile from "../components/mypage/MyProfile";
import MypageTab from "../components/mypage/MypageTab";

const SContainer = styled.div`
  margin-top: 100px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const SInfoDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AppMyPage = () => {
  // 페이지 mount시 네비게이션 바 이미지와 글씨 색 변경
  useEffect(() => {
    changeHeader();
    return () => {
      rollbackHeader();
    };
  }, []);

  return (
    <>
      <SContainer>
        <SInfoDiv>
          <MyProfile />
          <MyBadge />
        </SInfoDiv>
        <MypageTab />
      </SContainer>
    </>
  );
};

export default AppMyPage;
