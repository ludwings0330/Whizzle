import React from "react";

//components import
import SearchBar from "../components/search/SearchBar";
import SearchList from "../components/search/list/SearchList";

const AppSearch = () => {
  return (
    <>
      <h1>검색페이지</h1>
      <SearchBar />
      <SearchList />
    </>
  );
};

export default AppSearch;
