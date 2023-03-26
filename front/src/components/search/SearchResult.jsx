import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import SearchBar from "./SearchBar";
import SearchList from "./list/SearchList";

const Wrapper = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBarDiv = styled.div`
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SP = styled.p`
  font-size: 20px;
`;

const SSpan = styled.span`
  color: #f84f5a;
`;

const SearchResult = () => {
  useEffect(() => {
    const nav = document.getElementById("navbar");
    nav.style.backgroundColor = "#F84F5A";

    return () => {
      nav.style.backgroundColor = "transparent";
    };
  }, []);

  const { word } = useParams();

  return (
    <Wrapper>
      <SearchBarDiv>
        <SearchBar />
        <SP>
          <SSpan>'{word}'</SSpan> 검색 결과입니다.
        </SP>
      </SearchBarDiv>
      <SearchList />
    </Wrapper>
  );
};

export default SearchResult;
