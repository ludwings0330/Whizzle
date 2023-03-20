import React from "react";
import styled from "styled-components";
import ResultMainWhiskyItem from "./ResultMainWhiskyItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

//대표 추천 : 1~3등 위스키
const ResultMainWhisky = (props) => {
  const whiskys = [
    {
      name: "Glenfiddich 12 Year",
      category: "Single Malt",
      location: "Speyside, Scotland",
      abv: "40",
      priceTier: 2,
      avg_rating: 3.36,
      total_rating: 5952,
    },
    {
      name: "Glenlivet 12 Year Double Oak",
      category: "Single Malt",
      location: "Speyside, Scotland",
      abv: "40",
      priceTier: 2,
      avg_rating: 3.41,
      total_rating: 5811,
    },
    {
      name: "Macallan 12 Year Sherry Oak Cask",
      category: "Single Malt",
      location: "Highlands, Scotland",
      abv: "43",
      priceTier: 3,
      avg_rating: 3.82,
      total_rating: 5442,
    },
  ];
  return (
    <Wrapper>
      <props.STitleP style={{ width: "209px", height: "44px" }}>위스키 추천 리스트</props.STitleP>
      <props.SGraphP>
        <props.SColorSpan>drunkenbear</props.SColorSpan>
        <props.SSpan>님의 취향에 꼭 맞는 위스키입니다.</props.SSpan>
      </props.SGraphP>
      {whiskys ? (
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
