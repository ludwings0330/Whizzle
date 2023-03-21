import React from "react";
import styled from "styled-components";

import DailyResultItem from "./DailyResultItem";

const SWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px 23px;
  margin-top: 70px;
  margin-bottom: 150px;
  width: 1000px;
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

const DailyResult = () => {
  return (
    <>
      <SWrapper>
        {whiskys.map((whisky, index) => {
          return <DailyResultItem key={index} whisky={whisky} index={index} />;
        })}
      </SWrapper>
    </>
  );
};

export default DailyResult;
