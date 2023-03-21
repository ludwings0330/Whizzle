import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SInput = styled.input`
  width: 560px;
  height: 45px;
  border: 1px solid #c1c1c1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 999px;
  padding-left: 50px;
  font-size: 14px;

  ::placeholder {
    font-size: 14px;
    color: #adadad;
    text-indent: 0px;
    font-family: "Pretendard Variable";
  }
`;

const SDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 13px;
  gap: 4px;
  margin-right: 10px;

  height: 31px;

  background: #f84f5a;
  border-radius: 999px;
`;

const SP = styled.p`
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
`;

const SButton = styled.button`
  border: none;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
`;

const SWordDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  width: 560px;
  height: 50px;
`;

//searchBar
const SearchBar = () => {
  const [searchWord, setSearchWord] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);

  useEffect(() => {
    const recentSearchData = JSON.parse(sessionStorage.getItem("recentSearch"));
    if (recentSearchData) {
      setRecentSearch(recentSearchData);
    }
  }, []);

  const setRecentSearchData = (value) => {
    // axios 작업 필요
    let updatedRecentSearch = [...recentSearch];
    const existingIndex = updatedRecentSearch.indexOf(value);
    if (existingIndex !== -1) {
      updatedRecentSearch.splice(existingIndex, 1);
    }
    updatedRecentSearch.push(value);
    if (updatedRecentSearch.length > 5) {
      updatedRecentSearch.shift();
    }
    sessionStorage.setItem("recentSearch", JSON.stringify(updatedRecentSearch));
    setRecentSearch(updatedRecentSearch);
  };

  const setCookie = (e) => {
    if (e.key === "Enter") {
      setRecentSearchData(searchWord);
      setSearchWord("");
    }
  };

  const wordChange = (e) => {
    setSearchWord(e.target.value);
  };

  const deleteRecentSearchWord = (word) => {
    let updatedRecentSearch = [...recentSearch];
    const existingIndex = updatedRecentSearch.indexOf(word);
    if (existingIndex !== -1) {
      updatedRecentSearch.splice(existingIndex, 1);
      sessionStorage.setItem("recentSearch", JSON.stringify(updatedRecentSearch));
      setRecentSearch(updatedRecentSearch);
    }
  };

  return (
    <>
      <SInput
        onKeyDown={(e) => setCookie(e)}
        placeholder="찾고자 하는 위스키 이름을 입력하세요."
        onChange={wordChange}
        value={searchWord}
      />
      <SWordDiv>
        {recentSearch.map((word, index) => (
          <SDiv>
            <SP onClick={(e) => setRecentSearchData(e.target.innerText)} key={index}>
              {word.length > 6 ? `${word.slice(0, 6)}...` : word}
            </SP>
            <SButton onClick={() => deleteRecentSearchWord(word)}>X</SButton>
          </SDiv>
        ))}
      </SWordDiv>
    </>
  );
};

export default SearchBar;
