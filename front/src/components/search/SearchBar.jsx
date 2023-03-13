import React, { useState } from "react";
import styled from "styled-components";

const SInput = styled.input`
  width: 862px;
  height: 69px;
  border: 1px solid #c1c1c1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 999px;
  padding-left: 50px;
  font-size: 24px;

  ::placeholder {
    font-size: 24px;
    color: #adadad;
    text-indent: 10px;
  }
`;

//검색 창
const SearchBar = () => {
  const [searchWord, setSearchWord] = useState("");

  const wordChange = (e) => {
    setSearchWord(e.target.value);
    console.log(searchWord);
  };
  return (
    <>
      <SInput placeholder="찾고자 하는 위스키 이름을 입력하세요." onChange={wordChange} />
    </>
  );
};

export default SearchBar;
