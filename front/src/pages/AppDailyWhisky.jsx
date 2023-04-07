import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { recommend } from "../apis/recommend";
import { useRecoilState } from "recoil";
import { dailyPreference } from "../store/indexStore";

import DailyFlavor from "../components/daily/DailyFlavor";
import DailyPrice from "../components/daily/DailyPrice";
import DailyLoading from "../components/daily/DailyLoading";
import DailyExplain from "../components/daily/DailyExplain";
import WhiskyList from "../components/common/WhiskyList";

const SHeaderDiv = styled.div`
  max-width: 100vw;
  height: 230px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: linear-gradient(90deg, #f84f5a 28.12%, #f7875a 65.62%, #f7cb5a 100%);
`;

const SP = styled.p`
  font-size: 18px;
  color: white;
`;

const SMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 300px);
`;

const SHr = styled.hr`
  border: 0;
  height: 1px;
  background: #ccc;
  min-width: 900px;
`;

//데일리추천페이지
const AppDailyWhisky = () => {
  const [preference, setPreference] = useRecoilState(dailyPreference);

  const [isLoading, setIsLoading] = useState(false);
  const [dailyResult, setDailyResult] = useState([]);

  const dailyRecommendApi = async () => {
    setIsLoading(true);

    const body = {
      priceTier: preference.priceTier,
      flavor: preference.flavor,
    };

    try {
      const result = await recommend(body);
      setDailyResult(result);
      setIsLoading(false);
    } catch {}
  };

  useEffect(() => {
    if (preference.priceTier) {
      dailyRecommendApi();
    }
  }, [preference]);

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
        <DailyPrice preference={preference} setPreference={setPreference} />
        <DailyFlavor preference={preference} setPreference={setPreference} />
        <SHr />
        {isLoading ? (
          <DailyLoading />
        ) : dailyResult?.length === 0 ? (
          <DailyExplain />
        ) : (
          <WhiskyList whiskys={dailyResult} />
        )}
      </SMainDiv>
    </>
  );
};

export default AppDailyWhisky;
