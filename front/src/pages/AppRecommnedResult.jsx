import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userState } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { NON_LOGIN_NICKNAME } from "../constants/constants";
import { recommendResult, preference } from "../store/indexStore";

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

const SBtnDiv = styled.div`
  width: 100vw;
  max-width: 100%;
  display: flex;
  justify-content: center;
`;

const SQuestionBtn = styled.button`
  width: 318px;
  height: 74px;
  margin-right: 30px;
  margin-bottom: 200px;
  border: 3px solid transparent;
  border-radius: 999px;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(120.33deg, #f84f5a, #f29060, #f7cb5a);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #fff inset;
  cursor: pointer;
  font-family: "Pretendard Variable";
`;

const SDailyBtn = styled.button`
  width: 318px;
  height: 74px;
  border: 1px solid transparent;
  font-family: "Pretendard Variable";
  background: linear-gradient(106.95deg, #f84f5a 11.68%, #f2a660 86.99%);
  border-radius: 999px;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  font-weight: 600;
`;

//추천 결과 페이지
const AppRecommnedResult = () => {
  const recommend = useRecoilValue(recommendResult);
  const userPreference = useRecoilValue(preference);
  console.log(userPreference);
  console.log(recommend);

  const navigate = useNavigate();
  const onClickHandler = (e) => {
    if (e.target.innerText === "취향 정보 다시 입력하기") {
      navigate("/recommend/question");
    } else if (e.target.innerText === "데일리 위스키 추천받기") {
      navigate("/daily");
    }
  };

  // 가장 큰 2개의 값을 찾음
  const [maxValue, setMaxValue] = useState([]);
  const flavor = userPreference.flavor;

  useEffect(() => {
    const flavorEntries = Object.entries(flavor);
    flavorEntries.sort((a, b) => b[1] - a[1]);
    const maxValues = flavorEntries.slice(0, 2).map(([key, value]) => key.toUpperCase());
    setMaxValue(maxValues);
  }, []);

  const user = useRecoilValue(userState);

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
          <SColorSpan>{user.nickname ? user.nickname : NON_LOGIN_NICKNAME}</SColorSpan>
          <SSpan>님의 취향분석 결과입니다.</SSpan>
          <SBoldColorP>
            {maxValue[0]} & {maxValue[1]}
          </SBoldColorP>
        </SGraphP>
        <Graph flavor={flavor} />
      </SGraphDiv>
      <ResultMainWhisky
        whiskys={recommend.slice(0, 3)}
        SGraphP={SGraphP}
        SColorSpan={SColorSpan}
        SSpan={SSpan}
        STitleP={STitleP}
      />
      {recommend.length ? <ResultWhiskyList whiskys={recommend.slice(3)} /> : null}
      <SBtnDiv>
        <SQuestionBtn onClick={onClickHandler}>
          <SColorSpan style={{ fontSize: "20px", fontWeight: "600" }}>
            취향 정보 다시 입력하기
          </SColorSpan>
        </SQuestionBtn>
        <SDailyBtn onClick={onClickHandler}>데일리 위스키 추천받기</SDailyBtn>
      </SBtnDiv>
    </>
  );
};

export default AppRecommnedResult;
