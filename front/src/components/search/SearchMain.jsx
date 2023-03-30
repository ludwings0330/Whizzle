import React, { useEffect } from "react";
import styled from "styled-components";

import SearchBar from "./SearchBar";
import searchHeader from "../../assets/img/searchHeader.png";
import colorLogo from "../../assets/img/colorLogo.png";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const SHeaderDiv = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${searchHeader});
  background-repeat: no-repeat;
`;

const SMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
`;

const SP = styled.p`
  font-size: 20px;
  color: white;
`;

const SImg = styled.img`
  width: 272px;
  height: 75.75px;
  margin-bottom: 32px;
`;

const SearchMain = () => {
  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  });
  return (
    <Wrapper>
      <SHeaderDiv>
        <SP style={{ fontSize: "32px", marginBottom: "0px", fontWeight: "bold" }}>
          나만의 위's키 백과
        </SP>
        <SP>이름을 통해 원하는 위스키를 검색하세요!</SP>
      </SHeaderDiv>
      <SMainDiv>
        <SImg src={colorLogo} alt="로고" />
        <SearchBar />
      </SMainDiv>
    </Wrapper>
  );
};

export default SearchMain;
