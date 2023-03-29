import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { searchData } from "../../store/indexStore";
import { getsearchWhisky } from "../../apis/search";

import SearchBar from "./SearchBar";
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

const SBtn = styled.button`
  width: 257px;
  height: 64px;
  margin-bottom: 100px;
  font-family: "Pretendard Variable";
  border: 1px solid #a2a2a2;
  border-radius: 10px;
  color: #9b9b9b;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  margin-top: 50px;

  :hover {
    background-color: rgba(155, 155, 155, 0.2);
    color: rgba(0, 0, 0, 0.8);
  }
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
      window.scrollTo(0, 0);
    };
  }, []);

  // 검색시 필요한 변수, 검색 함수
  const { word } = useParams();
  const [result, setResult] = useRecoilState(searchData);
  const [last, setLast] = useState(false);
  const [offset, setOffset] = useState(0);
  async function getsearchResult(data) {
    try {
      const res = await getsearchWhisky(data);
      const isLast = res.last;
      const lastNum = isLast ? 0 : res.content[res.content.length - 1].id;
      const whiskys = res.content;
      setLast(isLast);
      setOffset(lastNum);
      if (whiskys.length) {
        setResult((prev) => [...prev, ...whiskys]);
      }
      console.log(res);
    } catch {
      console.log("검색 결과 저장 실패");
    }
  }
  // 결과 호출 과정
  useEffect(() => {
    setResult([]);
    const data = {
      word: word,
      offset: 0,
      size: 6,
    };
    console.log(word);
    getsearchResult(data);
  }, [word]);

  const getMore = () => {
    if (!last) {
      const data = {
        word: word,
        offset: offset,
        size: 6,
      };
      getsearchResult(data);
    }
  };

  return (
    <Wrapper>
      <SearchBarDiv>
        <SearchBar />
        <SP>
          <SSpan>'{word}'</SSpan> 검색 결과입니다.
        </SP>
      </SearchBarDiv>
      {result.length ? (
        <WhiskyList whiskys={result} />
      ) : (
        <p style={{ marginTop: "100px" }}>검색 결과가 없습니다</p>
      )}
      {last ? null : <SBtn onClick={getMore}>더 보기</SBtn>}
    </Wrapper>
  );
};

export default SearchResult;
