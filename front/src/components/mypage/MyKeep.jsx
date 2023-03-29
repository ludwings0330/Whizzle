import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { keepApi } from "../../apis/mypage";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/userStore";

import WhiskyList from "../common/WhiskyList";

const SContainer = styled.div`
  max-width: 780px;
  height: 387px;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 16px;
  margin-bottom: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  align-items: flex-start;
`;

const SWarning = styled.div`
  width: 1000px;
  height: 290px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

//마이페이지 내가 킵한 위스키
const MyKeep = () => {
  const user = useRecoilValue(userState);
  const id = user.id;
  const [whiskys, setwhiskys] = useState([]);

  const myKeepApi = async () => {
    const params = {
      memberId: id,
      lastOffset: whiskys.length === 0 ? null : whiskys[whiskys.length - 1].id,
      size: 6,
    };

    const keepedWhiskys = await keepApi(params);
    setwhiskys((prev) => [...prev, keepedWhiskys]);
  };

  useEffect(() => {
    // myKeepApi();
  }, []);

  return (
    <SListDiv>
      {whiskys.length > 0 ? (
        <WhiskyList whiskys={whiskys} />
      ) : (
        <SWarning>
          <span>현재 킵한 위스키가 없습니다</span>
          <span>내게 맞는 위스키 추천 받아보세요!</span>
        </SWarning>
      )}
    </SListDiv>
  );
};

export default MyKeep;
