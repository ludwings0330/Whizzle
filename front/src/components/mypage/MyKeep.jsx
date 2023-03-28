import React from "react";
import styled from "styled-components";

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

//마이페이지 내가 킵한 위스키
const MyKeep = () => {
  return (
    <SListDiv>
      <WhiskyList whiskys={whiskys} />
    </SListDiv>
  );
};

export default MyKeep;
