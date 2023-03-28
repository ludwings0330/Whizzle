import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import searchIcon from "../../assets/img/searchIcon.png";

const SInputDiv = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  width: 560px;
  height: 45px;
  border: 1px solid #c1c1c1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 999px;
  padding: 0 0 0 50px;
  background-position: 10px center;
  font-size: 14px;
  font-family: "Pretendard Variable";

  ${(props) =>
    props.autocompleteVisible &&
    css`
      border: 2px solid transparent;
      border-radius: 8px;
      border-bottom: 2px solid transparent;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      box-shadow: none;
    `}
`;

const SInput = styled.input`
  width: 560px;
  height: 45px;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0px;
  font-size: 14px;
  font-family: "Pretendard Variable";
  z-index: 5;
  ::placeholder {
    color: #adadad;
  }
`;

const SDiv = styled.div`
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: 10px center;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 50px;
  width: 490px;
  height: 50px;
  background-color: white;

  :hover {
    background-color: rgba(248, 248, 248, 1);
  }

  &:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

const SP = styled.p`
  display: flex;
  font-size: 14px;
  color: #000000;
  cursor: pointer;
`;

const SButton = styled.button`
  border: none;
  background-color: transparent;
  color: #000000;
  cursor: pointer;
  font-size: 14px;
`;

const SWordDiv = styled.div`
  margin-top: 50px;
  width: 560px;
`;

const SAutocompleteDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 560px;
  border: 2px solid transparent;
  border-color: rgba(248, 79, 90, 0.4);
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: auto;
  min-height: 50px;
  z-index: 3;
`;

// 검색창
const SearchBar = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);

  useEffect(() => {
    const recentSearchData = JSON.parse(localStorage.getItem("recentSearch"));
    if (recentSearchData) {
      setRecentSearch(recentSearchData);
    }
  }, []);

  const setRecentSearchData = (value) => {
    // 검색어를 로컬 스토리지에 최신순으로 저장
    let updatedRecentSearch = [...recentSearch];
    const existingIndex = updatedRecentSearch.indexOf(value);
    if (existingIndex !== -1) {
      updatedRecentSearch.splice(existingIndex, 1);
    }
    updatedRecentSearch.unshift(value);
    if (updatedRecentSearch.length > 5) {
      updatedRecentSearch.pop();
    }
    localStorage.setItem("recentSearch", JSON.stringify(updatedRecentSearch));
    setRecentSearch(updatedRecentSearch);
    navigate(`/search/${value}`);
    setAutocompleteVisible(false);
  };

  const searchHandler = (e) => {
    if (e.key === "Enter") {
      setRecentSearchData(searchWord);
      const search = document.getElementById("mySearch");
      search.blur();
      setSearchWord("");
    }
  };

  const wordChange = (e) => {
    setSearchWord(e.target.value);
  };

  // 검색어 삭제
  const deleteRecentSearchWord = (event, word) => {
    event.stopPropagation();
    let updatedRecentSearch = [...recentSearch];
    const existingIndex = updatedRecentSearch.indexOf(word);
    if (existingIndex !== -1) {
      updatedRecentSearch.splice(existingIndex, 1);
      localStorage.setItem("recentSearch", JSON.stringify(updatedRecentSearch));
      setRecentSearch(updatedRecentSearch);
    }
    setAutocompleteVisible(true);
  };

  // 검색창 focus시 div가 나오게 함. div에는 최근 검색어와 자동완성 표출
  // 검색창 외부를 클릭 시 위의 div가 사라짐 (상용 검색 사이트와 동일한 기능)
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const autocompleteRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setAutocompleteVisible(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [autocompleteRef]);

  return (
    <div style={{ position: "relative" }} ref={autocompleteRef}>
      <SInputDiv autocompleteVisible={autocompleteVisible}>
        <SInput
          id="mySearch"
          onFocus={() => setAutocompleteVisible(true)}
          onKeyDown={(e) => searchHandler(e)}
          placeholder="찾고자 하는 위스키 이름을 입력하세요."
          onChange={wordChange}
          value={searchWord}
        />
      </SInputDiv>
      {autocompleteVisible && (
        <SAutocompleteDiv>
          <SWordDiv>
            {recentSearch.map((word, index) => (
              <SDiv onClick={() => setRecentSearchData(word)}>
                <SP key={index}>{word.length > 20 ? `${word.slice(0, 20)}...` : word}</SP>
                <SButton onClick={(event) => deleteRecentSearchWord(event, word)}>X</SButton>
              </SDiv>
            ))}
          </SWordDiv>
        </SAutocompleteDiv>
      )}
    </div>
  );
};

export default SearchBar;
