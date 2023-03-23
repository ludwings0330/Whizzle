import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SInput = styled.input`
  border: none;
  border-bottom: 2px solid #949494;
  margin-left: 20px;
  width: 320px;
  height: 35px;
`;

const SDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 16px;
  gap: 4px;
  margin-right: 10px;
  height: 20px;

  background: #f84f5a;
`;

const SP = styled.p`
  font-size: 15px;
  color: #ffffff;
  cursor: pointer;
`;

const SButton = styled.button`
  border: none;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  font-size: 15px;
`;

const DiaryName = () => {
  const [searchWhisky, setSearchWhisky] = useState("");
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
      setRecentSearchData(searchWhisky);
      setSearchWhisky("");
    }
  };

  const wordChange = (e) => {
    setSearchWhisky(e.target.value);
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
        placeholder="위스키 이름을 입력해주세요."
        onChange={wordChange}
        value={searchWhisky}
      />
      <div style={{ display: "flex", marginTop: "20px" }}>
        {recentSearch.map((word, index) => (
          <SDiv>
            <SP onClick={(e) => setRecentSearchData(e.target.innerText)} key={index}>
              {word.length > 6 ? `${word.slice(0, 6)}...` : word}
            </SP>
            <SButton onClick={() => deleteRecentSearchWord(word)}>X</SButton>
          </SDiv>
        ))}
      </div>
    </>
  );
};

export default DiaryName;
