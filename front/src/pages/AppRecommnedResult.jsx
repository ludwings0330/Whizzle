import React from "react";
import styled from "styled-components";

//import components
import Graph from "../components/common/Graph";
import ResultMainWhisky from "../components/recommend/result/ResultMainWhisky";
import ResultWhiskyList from "../components/recommend/result/ResultWhiskyList";

const SHeader = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 300px;
  background: linear-gradient(108.47deg, #f84f5a 33.1%, #f7cb5a 92.59%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SP = styled.p`
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & span {
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
  }
`;

const SGraphDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const SGraphP = styled.p`
  display: inline-block;
  font-size: 20px;
  text-align: center;
`;

const SColorSpan = styled.span`
  background: linear-gradient(120.33deg, #f84f5a, #f29060, #f7cb5a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 700;
`;

const SSpan = styled.span`
  font-weight: 400;
  color: #a3a3a3;
`;

const STitleP = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 174px;
  height: 44px;
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 0px;

  background: #f84f5a;
  border-radius: 999px;
`;

const SBoldColorP = styled.p`
  background: linear-gradient(120.33deg, #f84f5a, #f29060, #f7cb5a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 700;
  font-size: 48px;
  margin-bottom: 0px;
`;

//추천 결과 페이지
const AppRecommnedResult = () => {
  return (
    <>
      <SHeader>
        <SP style={{ fontSize: "32px", marginBottom: "0px", fontWeight: "bold" }}>
          나만의 취향 찾기, 위스키 추천
        </SP>
        <SP>
          <span>넘쳐나는 위스키 바다 속</span>
          <span>오직 나만을 위한 추천 결과를 확인해보세요</span>
        </SP>
      </SHeader>
      <SGraphDiv>
        <STitleP>취향 분석 결과</STitleP>
        <SGraphP>
          <SColorSpan>drunkenbear</SColorSpan>
          <SSpan>님의 취향분석 결과입니다.</SSpan>
          <SBoldColorP>VANILLA & FRUITY</SBoldColorP>
        </SGraphP>
        <Graph />
      </SGraphDiv>
      <ResultMainWhisky SGraphP={SGraphP} SColorSpan={SColorSpan} SSpan={SSpan} STitleP={STitleP} />
      <ResultWhiskyList />
    </>
  );
};

export default AppRecommnedResult;
