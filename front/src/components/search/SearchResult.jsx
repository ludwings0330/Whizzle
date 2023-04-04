import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchData, showAllState } from "../../store/indexStore";
import { getsearchWhisky } from "../../apis/search";
import Lottie from "lottie-react";
import animationData from "../../assets/img/lotties/error-bear.json";

import SearchBar from "./SearchBar";
import WhiskyList from "../common/WhiskyList";
import { changeHeader, rollbackHeader } from "../../hooks/changeHeader";

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 105vh;
`;

const SearchBarDiv = styled.div`
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SP = styled.p`
  margin-top: 40px;
  font-size: 20px;
  color: #636363;
`;

const SSpan = styled.span`
  color: #f84f5a;
  font-weight: bold;
`;

const SearchResult = () => {
  const showAll = useRecoilValue(showAllState);
  useEffect(() => {
    changeHeader();
    return () => {
      rollbackHeader();
    };
  }, [showAll]);

  // 검색시 필요한 변수, 검색 함수
  const { word } = useParams();
  const observerRef = useRef(null);
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
    } catch {
      console.log("검색 결과 저장 실패");
    }
  }
  // 결과 호출 과정
  useEffect(() => {
    setResult([]);
    setOffset(0);
    setLast(false);
    const data = {
      word: word,
      offset: 0,
      size: 9,
    };
    getsearchResult(data);
  }, [word]);

  const getMore = () => {
    if (!last) {
      const data = {
        word: word,
        offset: offset,
        size: 9,
      };
      getsearchResult(data);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (offset) {
            getMore();
          }
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (observerRef.current && !last) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, offset]);

  return (
    <Wrapper>
      <SearchBarDiv>
        <SearchBar />
        {result.length ? (
          <SP>
            <SSpan>'{word}'</SSpan> 에 대한 검색 결과입니다.
          </SP>
        ) : (
          <SP>
            <SSpan>'{word}'</SSpan> 에 대한 검색 결과가 없습니다.
          </SP>
        )}
      </SearchBarDiv>
      {result.length ? (
        <WhiskyList whiskys={result} />
      ) : (
        <>
          <Lottie animationData={animationData} style={{ height: "450px", paddingTop: "10px" }} />
        </>
      )}
      <div ref={observerRef}></div>
    </Wrapper>
  );
};

export default SearchResult;
