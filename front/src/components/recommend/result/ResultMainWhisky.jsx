import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/userStore";
import ResultMainWhiskyItem from "./ResultMainWhiskyItem";
import { NON_LOGIN_NICKNAME } from "../../../constants/constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

//대표 추천 : 1~3등 위스키
const ResultMainWhisky = (props) => {
  const whiskys = props.whiskys;

  const user = useRecoilValue(userState);

  return (
    <Wrapper>
      <props.STitleP style={{ width: "195px", height: "40px" }}>위스키 추천 리스트</props.STitleP>
      <props.SGraphP>
        <props.SColorSpan>{user.nickname ? user.nickname : NON_LOGIN_NICKNAME}</props.SColorSpan>
        <props.SSpan>님의 취향에 꼭 맞는 위스키입니다.</props.SSpan>
      </props.SGraphP>
      {whiskys.length ? (
        whiskys.map((whisky, index) => (
          <ResultMainWhiskyItem key={index} index={index + 1} whisky={whisky} />
        ))
      ) : (
        <p>no data</p>
      )}
    </Wrapper>
  );
};

export default ResultMainWhisky;
