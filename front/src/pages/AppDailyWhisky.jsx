import React from "react";
import styled from "styled-components";

import DailyFlavor from "../components/daily/DailyFlavor";
import DailyFlavorItem from "../components/daily/DailyFlavorItem";
import DailyPrice from "../components/daily/DailyPrice";
import DailyResult from "../components/daily/DailyResult";

const SHeaderDiv = styled.div`
  max-width: 100vw;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: linear-gradient(90deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
`;

const SP = styled.p`
  font-size: 20px;
  color: white;
`;

const SMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
`;

//데일리추천페이지
const AppDailyWhisky = () => {
  return (
    <>
      <SHeaderDiv>
        <SP style={{ fontSize: "32px", marginBottom: "0px", fontWeight: "bold" }}>
          데일리 위스키 추천
        </SP>
        <SP>
          특별한 오늘, 새로운 위스키가 필요하다면?
          <br />
          태그 검색을 통해 평소와 다른 위스키를 추천받을 수 있어요!
        </SP>
      </SHeaderDiv>
      <SMainDiv>
        <DailyFlavor />
        <DailyFlavorItem />
        <DailyPrice />
        <DailyResult />
      </SMainDiv>
    </>
  );
};

export default AppDailyWhisky;
