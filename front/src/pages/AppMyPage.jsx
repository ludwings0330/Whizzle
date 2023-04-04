import React, { useEffect } from "react";
import styled from "styled-components";
import { changeHeader, rollbackHeader } from "../hooks/changeHeader";
import { userState } from "../store/userStore";
import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

//components import
import MyBadge from "../components/mypage/MyBadge";
import MyProfile from "../components/mypage/MyProfile";
import MypageTab from "../components/mypage/MypageTab";
import { showAllState } from "../store/indexStore";

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
  const user = useRecoilValue(userState);

  const location = useLocation();
  let memberId = user.id;
  if (location.state) memberId = location.state.memberInfo.memberId;

  // 페이지 mount시 네비게이션 바 이미지와 글씨 색 변경
  const showAll = useRecoilValue(showAllState);
  useEffect(() => {
    window.scrollTo(0, 0);
    changeHeader();
    return () => {
      rollbackHeader();
    };
  }, [showAll]);

  return (
    <>
      <SContainer>
        <SInfoDiv>
          <MyProfile memberId={memberId} />
          <MyBadge memberId={memberId} />
        </SInfoDiv>
        <MypageTab memberId={memberId} />
      </SContainer>
    </>
  );
};

export default AppMyPage;
