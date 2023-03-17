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
  font-size: 24px;
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

//추천 결과 페이지
const AppRecommnedResult = () => {
  return (
    <>
      <SHeader>
        <SP style={{ fontSize: "40px", marginBottom: "0px", fontWeight: "bold" }}>
          나만의 취향 찾기, 위스키 추천
        </SP>
        <SP>
          <span>넘쳐나는 위스키 바다 속</span>
          <span>오직 나만을 위한 추천 결과를 확인해보세요</span>
        </SP>
      </SHeader>
      <Graph />
      <ResultMainWhisky />
      <ResultWhiskyList />
    </>
  );
};

export default AppRecommnedResult;
