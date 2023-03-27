import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import SearchBar from "./SearchBar";
import SearchList from "./list/SearchList";
import WhiskyList from "../common/WhiskyList";

const Wrapper = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 70px);
`;

const SearchBarDiv = styled.div`
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SP = styled.p`
  margin-top: 70px;
  font-size: 20px;
`;

const SSpan = styled.span`
  color: #f84f5a;
`;

const SearchResult = () => {
  useEffect(() => {
    const nav = document.getElementById("navbar");
    nav.style.backgroundColor = "#F84F5A";
    const dropdown = document.getElementsByClassName("dropdown");
    for (let i = 0; i < dropdown.length; i++) {
      dropdown[i].style.color = "#181818";
    }

    return () => {
      nav.style.backgroundColor = "transparent";
      for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].style.color = "#ffffff";
      }
    };
  }, []);

  const { word } = useParams();

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

  return (
    <Wrapper>
      <SearchBarDiv>
        <SearchBar />
        <SP>
          <SSpan>'{word}'</SSpan> 검색 결과입니다.
        </SP>
      </SearchBarDiv>
      {whiskys.length ? (
        <WhiskyList whiskys={whiskys} />
      ) : (
        <p style={{ marginTop: "100px" }}>검색 결과가 없습니다</p>
      )}
    </Wrapper>
  );
};

export default SearchResult;
